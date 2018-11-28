/*
loader.js
variable 'app' is in global scope - i.e. a property of window.
app is our single global object literal - all other functions and properties of 
the game will be properties of app.
*/
"use strict";

// if app exists use the existing copy
// else create a new empty object literal
var app = app || {};


window.onload = function(){
	//console.log("window.onload called");
	app.main.sound = app.sound;
	app.sound.init();
	app.main.ui = app.ui;
	window.onload = app.main.ui.init();
	app.main.map = app.map;
	app.main.airCraft = app.airCraft;
	console.dir(app.main.airCraft);
	app.main.init();
}
window.onblur = function(){
	//console.log("blur at " + Date());
	app.main.pause();
	app.main.sound.stopBGAudio();
};

window.onfocus = function(){
	//console.log("focus at " + Date());
	//console.log("welcome back");
	app.main.sound.playBGAudio();
	
};	

