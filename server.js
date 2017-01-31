/*requiring node modules starts */

var app = require("express")();
/*Using with Express 3/4
app.router no longer exists, which means app.get etc and app.use
are now processed in the exact order you add them.
ings like bodyParser are now obtained separately.*/
var http = require('http').Server(app);
var io = require("socket.io")(http);
var Session = require('express-session');
var cookieParser = require('cookie-parser');
/*requiring node modules ends */

/*middleware:software that acts as a bridge between an operating system
or database and applications, especially on a network.
app.use():To setup your middleware, you can invoke app.use(<specific_middleware_layer_here>)
for every middleware layer that you want to add */

// the session is stored in a cookie, so we use this to parse it
app.use(cookieParser());
/*Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
 Optionally you may enable signed cookie support by passing a secret string,
 which assigns req.secret so it may be used by other middleware.*/


//Note:Session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.
var Session= Session({
	secret:'secrettokenhere',
	saveUninitialized: true,
/*	saveUninitialized
 Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified.
 Choosing false is useful for implementing login sessions, reducing server storage usage, */
	resave: true
/*resave
 Forces the session to be saved back to the session store, even if the session was never modified during the request.
 Depending on your store this may be necessary,but it can also create race conditions where a client makes two parallel requests
 to your server and changes made to the session in one request may get overwritten when the other request ends,
 even if it made no changes*/
});

//Registers a middleware, which is a function that gets executed forevery incoming Socket
io.use(function(socket, next) {
	    Session(socket.request, socket.request.res, next);
});


app.use(Session);

var sessionInfo;

/* requiring config file starts*/
var config =require('./middleware/config.js')(app);
/* requiring config file ends*/

/* requiring config db.js file starts*/
var db = require("./middleware/db.js");
var connection_object= new db();
var connection=connection_object.connection; // getting conncetion object here
/* requiring config db.js file ends*/

/* requiring config db.js file starts*/
var dbb = require("./middleware/db2.js");
var connection_objects= new dbb();
var connections=connection_objects.connections; // getting conncetion object here
/* requiring config db.js file ends*/

/*
	1. Requiring auth-routes.js file, which takes care of all Login & Registration page operation.
	2. Passing object of express, Database connection, expressSession and cookieParser.
	3. auth-routes.js contains the methods and routes for Login and registration page.
*/
require('./middleware/auth-routes.js')(app,connection,Session,cookieParser,sessionInfo);
/*
	1. Requiring routes.js file, which takes handles the Home page operation.
	2. Passing object of express, Database connection and object of socket.io as 'io'.
	3. routes.js contains the methods and routes for Home page
*/
require('./middleware/routes.js')(app,connections,io,Session,cookieParser,sessionInfo);

/*
	Running our application
*/
http.listen(81,function(){
    console.log("Listening on http://127.0.0.1:81");
});
