module.exports = function(Message) {

	Message.sendMessage = function(message,cb){
		console.log("Called");
		console.log(message);
		Message.create({'content':message.content,
						'userId':message.userId,
						'roomId':message.roomId,
						'posted_on':new Date()},function(err,message){
							Message.findById(message.id,{include:{relation:'user'}},function(err,data){
								console.log(data);
								Message.app.io.to(message.roomId).emit('message',data);
								cb();
							});
						});
	}

	Message.remoteMethod('sendMessage', {
		accepts: [
	      {arg: 'message', type: 'object', http: { source: 'body' }}
	     ],
	    returns: {arg: 'success', type: 'boolean'},
	    http: {path:'/sendmessage', verb: 'post'}
	  });

};
