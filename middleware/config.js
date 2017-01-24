var express = require("express");
var path= require('path');
//assiging all the config functions to method var
var method=config.prototype;

function config(app){

    // Setting .html as the default template extension
	app.set('view engine', 'html');

	// Initializing the ejs template engine
	app.engine('html', require('ejs').renderFile);

	// Telling express where it can find the templates
	app.set('views', (__dirname + '/../views'));//Express look for the view inside /folder/views and

	//Files
	app.use(express.static(path.join('views')));//The path.join() method joins all given path segments together
                                              //using the platform specific separator as a delimiter,
                                              //then normalizes the resulting path.

}

method.get_config=function(){
	return this;
}

module.exports = config;
