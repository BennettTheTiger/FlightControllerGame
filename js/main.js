'use strict';

var app = app || {};

app.main = {
	canvas: undefined,
	ctx: undefined,
	highScoreE: undefined,
	
	score: 0,
	gameState:{
		highScore: 0,
		currentScore: 0,
		score0: 0,
		score1: 0,
		score2: 0,
		play: false,
		level: 'easy',
		state: 'menu'
	},
	fleet: null,
	map : undefined,
	spawnRate: undefined,
	airCraft : undefined,
	fleet: undefined,
	sound: undefined,
	ui:undefined,
	//timing for spawing
	scoreData: undefined,
	spawnKey: undefined,
		
	
	
	
	init : function(){	
		this.fleet = new Array();
		this.fleet[0] = this.airCraft.makeAircraft();//make the first plane
		//console.dir(this.fleet.length);
		//difficulty is changed by altering setInterval time
		this.spawnKey = 10000;
		this.spawnRate = setInterval(this.spawnAircraft,this.spawnKey);//rate at which new aircraft are spawned	
			
		this.canvas = document.querySelector('#homeScreen');
		this.ctx = this.canvas.getContext('2d');
			
		//handles click events
		this.canvas.onmousedown = function(e){
			var mouse = app.main.getMousePos(app.main.canvas,e);
			for(var i = 0; i < app.main.fleet.length; i++){
				//console.dir(fleet[i]);
				app.main.airCraft.selectPlane(app.main.fleet[i],mouse);//check all active aircraft for selection
			}
		}
		//link mouse movement to route aircraft when selected
		
		this.canvas.onmousemove = function(e){
			for(var i = 0; i<app.main.fleet.length; i++){
			if(app.main.fleet[i].selected){
				app.main.fleet[i].course.push(app.main.airCraft.getWayPoint(e));
				app.main.fleet[i].rogue = false;
			}
			}
		}
		//link up play buttons for play and resume
		var playButtons = document.querySelectorAll('.playButton,.resumeButton');
		for(var i = 0; i < playButtons.length; i++){
			playButtons[i].addEventListener('click',function(){
				console.log("clicked play");
				app.main.play();
			});
		}
		
		//link up quit buttons
		var playButtons = document.querySelectorAll('.quitButton');
		for(var i = 0; i < playButtons.length; i++){
			playButtons[i].addEventListener('click',function(){
				app.main.quit();
			});
		}
	
			app.main.upDate();
		},//end init()
		
		//game loop
		upDate : function(){
			if(app.main.gameState.play && app.main.gameState.state != 'menu'){
			app.main.map.gameMap.drawMap(app.main.ctx,app.main.canvas);
			for(var i = 0; i < app.main.fleet.length; i++ ){
			
					app.main.fleet[i].fly(app.main.canvas);//move the aircraft
					//check for warnings like fuel and proximity to others
					app.main.fleet[i].didLand(app.main.map.landingSpots,app.main.fleet);//check if its landing
					app.main.fleet[i].checkStatus(app.main.fleet,25,app.main.ctx);
					app.main.fleet[i].show(app.main.ctx);//display the plane
				
				}
			}
			else{
				cancelAnimationFrame(app.main.animationID);//stop animation
				clearInterval(app.main.spawnRate);//stop spawning more aircraft
				
			}
			app.main.ui.updateScore();//update score object
			app.main.animationID = requestAnimationFrame(app.main.upDate);
		},
		
		//gets the mouse click
		getMousePos : function(canvas, evt) {
        	var rect = canvas.getBoundingClientRect();
        	return {
          		x: evt.clientX - rect.left,
				y: evt.clientY - rect.top
        		};
      	},
		//add another Aircraft
		spawnAircraft: function(){
			console.log("spawned another plane");
			app.main.sound.playEffect(0);
			app.main.fleet[app.main.fleet.length] = app.main.airCraft.makeAircraft();
		},
	
		reset : function(){
			console.log("game reset");
			app.main.gameState.state = "menu";
			app.main.fleet = []; //clear the fleet array;
			app.main.fleet[0] = this.airCraft.makeAircraft();//add one plane for when the game resumes
			app.main.gameState.currentScore = 0;
			app.main.gameState.score0 = 0;
			app.main.gameState.score1 = 0;
			app.main.gameState.score2 = 0;
			cancelAnimationFrame(this.animationID);//stop animation
			clearInterval(app.main.spawnRate);//stop spawning more aircraft
			app.main.sound.playBGAudio();
		},
		quit : function(){
			console.log("quit");
			app.main.ui.newGame();
			app.main.gameState.state = "menu";
			cancelAnimationFrame(this.animationID);//stop animation
			clearInterval(app.main.spawnRate);//stop spawning more aircraft
			app.main.gameState.play = false;
			app.main.sound.playEffect(1);
			//app.main.reset();
		},
		
		pause : function(){
			if(app.main.gameState.play && app.main.gameState.state != 'menu'){
			console.log("paused");
			app.main.gameState.play = false;
			cancelAnimationFrame(app.main.animationID);//stop animation
			clearInterval(app.main.spawnRate);//stop spawning more aircraft
			app.main.ui.pauseScreen();
			}
		},
		
		gameOver : function(){
			console.log("game over");
			app.main.gameState.state = "menu";
			cancelAnimationFrame(this.animationID);//stop animation
			clearInterval(app.main.spawnRate);//stop spawning more aircraft
			app.main.gameState.play = false;
			app.main.sound.playEffect(1);
			app.main.reset();
			app.main.ui.gameOverScreen();
		},
	
		play : function(){
			console.log("play");
			app.main.gameState.state = "gamePlay"
			app.main.ui.playGame();
			app.main.gameState.play = true;
			app.main.sound.playEffect(0);
			this.upDate();
			console.log("spawning planes every " + app.main.spawnKey + "ms");
			this.spawnRate = setInterval(this.spawnAircraft,app.main.spawnKey);
			app.main.sound.stopBGAudio();
		},
		changeScore : function(scoreType){
			switch(scoreType){
				case 0:
					app.main.gameState.score0++;
					break;
				case 1:
					app.main.gameState.score1++;
					break;
				case 2:
					app.main.gameState.score2++;
					break;
				default:
					console.log("unknown score");
					break;
					
			}
		var gState = app.main.gameState;
			gState.currentScore++;
			if(gState.currentScore > gState.highScore){
				gState.highScore = gState.currentScore;
			}
		},
		

}//end app.main
window.onload = app.main.init;
		