var bodyParser = require('body-parser');


// requiring Helper file to run helper functions
var helper = require('./helper');
exports.helper = helper;

var method=routes.prototype;

function routes(app,connection,io,sessionInfo){
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());

	// creating array of users.
	var users=[];
	var uid="";


	/*
		Socket event starts
	*/
	io.on('connection',function(socket){



		var uIdSocket=socket.request.session.uid;


		//Storing users into array as an object
	    socket.on('userInfo',function(userinfo){
	    	/*
	    		Adding Single socket user into 'uesrs' array
	    	*/

			var should_add=true;
	    	if(users.length == 0){
	    		userinfo.socketId=socket.id;
	    		users.push(userinfo);
	    	}else{
	    		users.forEach(function(element, index, array){
	    			if(element.id == userinfo.id){
			    		should_add=	false;
			    	}
				});
				if (should_add) {
					userinfo.socketId=socket.id;
	    			users.push(userinfo);
			    };
	    	}





	    	should_add=true;
	    });

	   	/*
			'sendMsg' will save the messages into DB.
	   	*/


	    /*
	    	Sending Typing notification to user.
	    */

	    /*
	    	Removig user when user logs out
	    */
});

	/*
		Socket event Ends
	*/


	/*
		get to render Home page
	*/

	app.get('/home',function(req, res){
		sessionInfo=req.session;
		if(!sessionInfo.uid){
			res.redirect("/");
			res.end();
		}else{
			/*res.redirect('/home#?id='+sessionInfo.uid);*/
			res.render('home');
			res.end();
		}
	});

	/*
		post to handle get_userinfo request
	*/
	app.post('/get_userinfo', function(req, res){
		var data={
			query:"select id,userName from users where id='"+req.body.uid+"'",
			connection:connection
		}
		helper.queryRunner(data,function(result){
			if(result.length>0) {
				var user_info="";
				result.forEach(function(element, index, array){
					user_info=element;
				});
		    	result_send={
		    		is_logged:true,
		    		data:user_info,
		    		msg:"OK"
		    	};
		    } else {
		    	result_send={
		    		is_logged:false,
		    		data:null,
		    		msg:"BAD"
		    	};
		    }
		    res.write(JSON.stringify(result_send));
			res.end();
		});
	});

	/*
		post to handle get_msgs request
	*/


	/*
		post to handle get_recent_chats request
	*/

	/*
		post to handle get_users_to_chats request
	*/


	app.get('/logout', function(req, res){
		sessionInfo=req.session;
		var uid=sessionInfo.uid;


			req.session.destroy(function(err) {
				if(err) {
			    	console.log(err);
			  	} else {
			  		io.emit('exit',1);
					res.redirect('/');
			  	}


		});
	});

}

method.getroutes=function(){
	return this;
}

module.exports = routes;
