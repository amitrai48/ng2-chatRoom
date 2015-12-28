module.exports = function(server) {
  // Install a `/` route that returns server status
 /* var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  server.use(router);*/

  var router = server.loopback.Router();
  router.get('/auth/currentUser', function(req,res){
  	 var AccessTokenModel = server.models.AccessToken;
	  AccessTokenModel.findForRequest(req, {}, function (err, token) {
	    if (err) {
	    	res.status(500).send(err);
	    }
	    if ( ! token) {
	    	console.log("NO TOKEN FOUND");
	    	res.send("no token found");
	    } 

	    var UserModel = server.models.ChatUser;
	    UserModel.relations.accessTokens.modelTo.findById(token.id, function(err, accessToken) {
	      if (err){
	      	 res.status(500).send(err);
	      } 
	      	
	      if ( ! accessToken){
	      	res.status(500).send("Token id doesnt exist");

	      } 
	      // Look up the user associated with the access token
	      UserModel.findById(accessToken.userId, function (err, user) {
	        if (err){
	        	res.status(500).send(err);
	        } 
	        if ( ! user){
	        	res.status(500).send('could not find a valid user with the given token');
	        }
	        res.send(user);
	      });

	    });
	  });

  });
  server.use(router);
};
