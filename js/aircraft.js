'use strict';

var app = app || {};

app.airCraft = (function(){
		 function makeAircraft(){
			var airCraft = {
			selected : false,
			landed : false,
			x : 10,
			y : 10,
			dx: 0.8,
			dy: 0.8,
			course : new Array({x:this.x,y:this.y}),
			rogue : true,
			status: "inFlight",
			fuel : 50 + Math.ceil(Math.random()*50),
			type : Math.floor(Math.random()*3),//random number between 0-2 
			//displays the aircraft
			show : function(ctx){
				
				//if the plane has a course
				if(this.course.length > 2){
					ctx.save();
					// move to the first point
					ctx.moveTo(this.x, this.y);
   					for (var i = 0; i < this.course.length - 2; i ++)
   					{
      				var xc = (this.course[i].x + this.course[i + 1].x) / 2;
      				var yc = (this.course[i].y + this.course[i + 1].y) / 2;
      				ctx.quadraticCurveTo(this.course[i].x, this.course[i].y, xc, yc);
					}
 					// curve through the last two points
					ctx.quadraticCurveTo(this.course[i].x, this.course[i].y, this.course[i+1].x,this.course[i+1].y);
					ctx.lineWidth = 2;
					ctx.strokeStyle = 'white';
					ctx.stroke();
					ctx.restore();
				}
				
				ctx.save();
				ctx.beginPath();
				ctx.arc(this.x,this.y,5,0,Math.PI*2,false);
				switch(this.type){
					case 0:
						ctx.fillStyle = "blue";
						break;
					case 1:
						ctx.fillStyle = "purple";
						break;
					case 2:
						ctx.fillStyle = "orange";
						break;
					default:
						ctx.fillStyle = "yellow";
				}
				ctx.fill();
				ctx.restore();
				
			},
			fly : function(canvas){
				if(this.course.length >2){
						var cX = this.course[0].x - this.x;
						var cY = this.course[0].y - this.y;
						var d = Math.sqrt((cX*cX)+(cY*cY));
						this.dx = cX/d;
						this.dy = cY/d;
						//if it has reached a waypoint
						if(Math.round(this.x) == this.course[0].x && Math.round(this.y)==this.course[0].y){
							//console.log("hit Way point");
							this.course.shift();//removes from course array
						}		
					}
				else if(this.course.length == 2){
					this.rogue = true;
					this.landingTolerance = this.maxTolerance;
				}
				//move plane
				this.x += this.dx*this.speed;
				this.y += this.dy*this.speed;
				//wrap the plane around if its off screen
				if(this.x > canvas.width){
					this.x = 10;
				}
				if(this.x < -10){
					this.x = canvas.width - 10;
				}
				if(this.y > canvas.height){
					this.y = 10;
				}
				
				if(this.y < 0){
					this.y = canvas.height - 10;
				}
			},
			
			didLand : function(map,fleet){
				if(!this.rogue){
					for(var i = 0; i < map.length; i++){
						if(this.type === map[i].type){
							//found a runway check if its on the runway
							var goal = map[i];
							//see if its a runway or helipad
							if(this.type != 2){
							if(this.x > goal.x && this.x < goal.x + goal.width){
								if(this.y > goal.y && this.y < goal.y + goal.height){
									console.log("Over the right runway");
									this.landingTolerance--;
									if(this.landingTolerance === 0){
										console.log("Plane landed");
										this.landed = true;
										fleet.splice(fleet.indexOf(this),1);//removes the plane from the fleet
										app.main.sound.playEffect(1);
										app.main.changeScore(this.type);
								  }
								}
							  }
							}
							//handles circular laning pad for helicopers
							else{
								if(this.x > goal.x - goal.size && this.x < goal.x + goal.size){
									if(this.y > - goal.y - goal.size && this.y < goal.y + goal.size){
										console.log("Heli on target");
										this.landingTolerance--;
										if(this.landingTolerance === 0){
											app.main.score2++;
											this.landed = true;
											fleet.splice(fleet.indexOf(this),1);//removes the plane from the fleet
											app.main.sound.playEffect(1);
											app.main.changeScore(this.type);
										}
									}
								}
							}//end else
						}
					}
				}
				
					
			},//end of didLand()
			checkStatus : function(otherPlane,tollerance,ctx){
				for(var i = 0; i < otherPlane.length;i++){
					if(i != otherPlane.indexOf(this)){
						//console.log("checked " + i + " on " + otherPlane.indexOf(this));
					if(this.x < otherPlane[i].x + tollerance && this.x > otherPlane[i].x-tollerance){
						//console.log("in x bounds of plane" + i);
						if(this.y < otherPlane[i].y + tollerance && this.y > otherPlane[i].y-tollerance){
							//app.main.sound.playEffect(2);
							ctx.save();
							ctx.lineWidth = 3;
							ctx.strokeStyle = 'rgba(255,255,0,.5)'; 
							ctx.beginPath();
							ctx.arc(this.x,this.y,tollerance,0,Math.PI*2);
							ctx.stroke();
							ctx.restore();
						}//y check
					}//x check
						
						if(this.x < otherPlane[i].x + tollerance/2 && this.x > otherPlane[i].x-tollerance/2){
						//console.log("in x bounds of plane" + i);
						if(this.y < otherPlane[i].y + tollerance/2 && this.y > otherPlane[i].y-tollerance/2){
							this.status = 'crashed';
							otherPlane[i].status = 'crashed';
							app.main.gameState.state = "gameOver";
							app.main.sound.playEffect(3);
							app.main.gameOver();
							app.main.gameState.play = false;
							ctx.save();
							ctx.fillStyle = 'rgba(255,0,0,.5)'; 
							ctx.beginPath();
							ctx.arc(this.x,this.y,tollerance/2,0,Math.PI*2);
							ctx.fill();
							ctx.restore();
						}//y check
					}//x check
		
					}//dont check itself
				}	
			}
			}//end aircraft obj
			if(airCraft.type == 0){
					airCraft.speed = .5;
					airCraft.landingTolerance = 50;
					airCraft.maxTolerance = 50;
				}
				else if(airCraft.type == 1){
					airCraft.speed = .3;
					airCraft.landingTolerance = 30;
					airCraft.maxTolerance = 30;
				}
				else if(airCraft.type == 2){
					airCraft.speed = .1;
					airCraft.landingTolerance = 10;
					airCraft.maxTolerance = 30;
				}


			
			return Object.seal(airCraft);
			
		}//end of make airCraft()
		
		//checks to see if a plane was clicked
		function selectPlane(plane,m){
			if(plane.selected){
				plane.selected = false;
			}
			else if(plane.x <= m.x+5 && plane.x >= m.x -5){
					if(plane.y <= m.y+5 && plane.y >m.y-5){
						plane.course = [];//clear the array
						plane.selected = true;	
					}
				}
			}//end select plane
			
		//get the mouse postion
		function getWayPoint(e){
			var point = {
				x: e.x,
				y: e.y
			}
			return Object.seal(point);
		}
		//export functions
		return{
			makeAircraft: makeAircraft,
			selectPlane: selectPlane,
			getWayPoint: getWayPoint
		}
}());//end IIFE