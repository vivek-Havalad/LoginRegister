/*requiring mysql node modules */
var mysql = require("mysql");

var method = db.prototype;

function db() {
	/*
		creating MySql database connection
	*/
	var con = mysql.createPool({//Rather than creating and managing connections one-by-one,
                              //this module also provides built-in connection pooling using
		host : 'localhost',
	  	user : 'root',
	  	password : 'tas123',
	  	database : 'angular'
	});
	this.connection=con;
}
method.getcon = function() {
	return this;
};
//module.exports is the object that's actually returned as the result of a require call.
module.exports = db;
