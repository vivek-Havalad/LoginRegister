/*requiring mysql another node modules */
var mysql = require("mysql");

var methods = dbb.prototype;

function dbb(){
  /*
    creating MySql database connection
  */
  var con = mysql.createPool({
  host: "localhost",
  user:"root",
  password: "tas123",
  database: "examples"
});
this.connections=con;
}
methods.getcons = function() {
	return this;
};
//module.exports is the object that's actually returned as the result of a require call.
module.exports = dbb;
