"use strict";


var app = app || {};

app.ui = (function(){
	//console.log("UI module loaded");
	var gameScreen,homeScreen,pauseScreen,gameOverScreen, welcomBackTxt;
	var welcomeBackMsg = ["Welcome back to the job you probably didnt want to come back to...","Do that again and you're fired!","You're lucky this isnt real life. Or is it?","So... want to keep playing or nah?"];
	
	function init(){
		//get each wrapped element from the dom
		gameScreen = document.querySelector('.gameScreen');
		pauseScreen = document.querySelector('#pauseScreen');
		welcomBackTxt = document.getElementById("#msg");
		gameOverScreen = document.querySelector('#gameOverScreen');
		homeScreen = document.querySelector('.homeScreen');
		document.querySelector('.doneButton').onclick = app.main.quit();
		
		newGame();
	}
	//display the new game screen
	function newGame(){
		hide(gameScreen);
		hide(pauseScreen);
		hide(gameOverScreen);
		show(homeScreen);
	}
	//diplsay the game screen 
	function playGame(){
		show(gameScreen);
		hide(homeScreen);
		hide(pauseScreen);
		hide(gameOverScreen);
		
	}
	//display the paused screen
	function pauseScreen(){
		msg.textContent = welcomeBackMsg[Math.floor(Math.random()*welcomeBackMsg.length)];//say random welcome back msg
		show(gameScreen);
		show(pauseScreen);
		hide(homeScreen);
		hide(gameOverScreen);
	}
	
	function gameOver(){
		show(gameScreen);
		show(gameOverScreen);
		hide(pauseScreen);
		hide(homeScreen);
		app.main.sound.playBGAudio();
	}
	//hide an element by changing its css properties
	function hide(e){
		e.style.display = "none";
	}
	//show an element by changing its css properties
	function show(e){
		e.style.display = "block";
	}
	//update the score ui
	function updateScore(){
			document.querySelector('#highScore').innerHTML = "Highscore :" + app.main.gameState.highScore;
			document.querySelector('#score').innerHTML = "Score : " + app.main.gameState.currentScore;
			document.querySelector('#airlinerScore').innerHTML = "Airliners :" + app.main.gameState.score0;
			document.querySelector('#personalScore').innerHTML = "Personal :" + app.main.gameState.score1;
			document.querySelector('#heliScore').innerHTML = "Helicopters :" + app.main.gameState.score2;
		}
	
	window.onload = init;
	
	return{
		init : init,
		newGame : newGame,
		updateScore : updateScore,
		playGame : playGame,
		pauseScreen : pauseScreen,
		gameOverScreen : gameOver
	}
	
}());