var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module){
    //app.start();
  app.locals.onlineUsers = 0;
  app.io = require('socket.io')(app.start());
  app.io.on('connection',function(socket){
    console.log('a user connected');
    app.locals.onlineUsers++;
    app.models.Room.find({},function(err,data){
      if(data){
        var temp = {};
        for(var i= 0;i<data.length;i++){
          if(app.io.sockets.adapter.rooms[data[i].id])
            temp[data[i].id]=Object.keys(app.io.sockets.adapter.rooms[data[i].id]).length;
        }
        app.locals.roomCounts = temp;
      }
      app.io.emit('count',{allCount:app.locals.onlineUsers,roomCounts:app.locals.roomCounts});
    });
    
    socket.on('subscribe',function(room){
      console.log(room);
      console.log('joining room',room.newRoom.id);
      if(room.oldRoom){
        socket.leave(room.oldRoom.id);
        app.io.to(room.oldRoom.id).emit('room info',room.user.email + ' has left the room ');
        if(app.io.sockets.adapter.rooms[room.oldRoom.id])
          app.locals.roomCounts[room.oldRoom.id] = Object.keys(app.io.sockets.adapter.rooms[room.oldRoom.id]).length;
        else
          app.locals.roomCounts[room.oldRoom.id] = 0;
      }
      socket.join(room.newRoom.id);
      app.locals.roomCounts[room.newRoom.id] = Object.keys(app.io.sockets.adapter.rooms[room.newRoom.id]).length;
      app.io.emit('count',{allCount:app.locals.onlineUsers,roomCounts:app.locals.roomCounts});
      app.io.to(room.newRoom.id).emit('room info',room.user.email + ' has joined the room ');
    });

    socket.on('disconnect',function(){
      console.log("user disconnected");
      app.locals.onlineUsers--;
      app.models.Room.find({},function(err,data){
      if(data){
        var temp = {};
        for(var i= 0;i<data.length;i++){
          if(app.io.sockets.adapter.rooms[data[i].id])
            temp[data[i].id]=Object.keys(app.io.sockets.adapter.rooms[data[i].id]).length;
        }
        app.locals.roomCounts = temp;
      }
      app.io.emit('count',{allCount:app.locals.onlineUsers,roomCounts:app.locals.roomCounts});
    });
    });
  });
}
});
