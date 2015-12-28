module.exports = function(Message) {

        Message.sendMessage = function(message, cb) {
            console.log("Called");
            console.log(message);
            message.posted_on = new Date();
            Message.app.models.ChatUser.findById(message.userId,function(err, data) {
                console.log(data);
                message.user = data;
                Message.app.io.to(message.roomId).emit('message', message);
                cb();
            });
        }

            Message.remoteMethod('sendMessage', {
                accepts: [{
                    arg: 'message',
                    type: 'object',
                    http: {
                        source: 'body'
                    }
                }],
                returns: {
                    arg: 'success',
                    type: 'boolean'
                },
                http: {
                    path: '/sendmessage',
                    verb: 'post'
                }
            });

        };
