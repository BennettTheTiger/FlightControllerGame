// sound.js
"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};

// define the .sound module and immediately invoke it in an IIFE
app.sound = (function(){
	//console.log("sound.js module loaded");
	var bgAudio = undefined;
	var gameAudio = undefined;
	var effectSounds = ["newPlane.mp3","landed.mp3","alarmTone.mp3","crash.mp3","switch.mp3"];
	var sfxLevel = .5;
	
	function init(){
		bgAudio = document.querySelector("#bgMusic");
		//link up volume controls to the dom
		document.querySelector('#bgLevel').onchange = function(e){
			bgAudio.volume = e.target.value;
		}
		document.querySelector('#sfxLevel').onchange = function(e){
			sfxLevel = e.target.value;
		}
		//console.dir(document.querySelectorAll('.levelPicker'));
		document.querySelector('#levelPicker1').onchange = function(e){
			playEffect(4);
			console.log(e.target.value);
			document.querySelector('.levelTxt').innerHTML = "Airspace is fairly quiet. A plane every once and a while. Thats no reason to slack off though.";
			app.main.spawnKey = e.target.value;
		}
		document.querySelector('#levelPicker2').onchange = function(e){
			playEffect(4);
			console.log(e.target.value);
			document.querySelector('.levelTxt').innerHTML = "This isnt your first time directing air traffic, expect busier airspace!";
			app.main.spawnKey = e.target.value;
		}
		document.querySelector('#levelPicker3').onchange = function(e){
			playEffect(4);
			console.log(e.target.value);
			document.querySelector('.levelTxt').innerHTML = "Not for the faint of heart! expect extreamly busy airspace! Even a few weather disterbances so best be on your A game!";
			app.main.spawnKey = e.target.value;
		}
		bgAudio.volume = .5;
		playBGAudio();
	}
		
	function stopBGAudio(){
		bgAudio.pause();
		bgAudio.currentTime = 0;
	}
	
	function playEffect(effectIndex){
    var effectSound = document.createElement('audio');
    effectSound.volume = sfxLevel;
		effectSound.src = "assets/audio/" + effectSounds[effectIndex]; 
		effectSound.play();	
	}
	
	function playBGAudio(){
		bgAudio.play();
	}
		
	// export a public interface to this module
	return{
		init: init,
		stopBGAudio: stopBGAudio,
		playEffect: playEffect,
		playBGAudio: playBGAudio
	}
}());