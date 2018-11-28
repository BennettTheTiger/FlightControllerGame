'use strict';
//basic map
//2 runways and a heli pad
//fits 1000 x 600px canvas
var app = app || {};
		
	
app.map = (function(){
		var map = {
			bgColor : 'green',
			primary : {
				x:400,
				y:200,
				width:200,
				height:20,
				type: 0 //for airliners
			},
			secondary : {
				x:420,
				y:180,
				width:20,
				height:100,
				type:1 //private planes
			},
			heliPad : {
				x:475,
				y:250,
				size:15,
				type:2 //helicopters
			},
		
		//draw map needs the canvas context
		drawMap : function(ctx,canvas){
			ctx.save();
			//add the background
			ctx.fillStyle = 'grey';//'rgba(0,150,0,1)'
			
			ctx.fillRect(0,0,canvas.width,canvas.height);
			ctx.lineWidth = 2;
			//add the runways
			ctx.fillStyle = '#252525';//runwayColor
			//primary
			ctx.strokeStyle = "blue";
			ctx.strokeRect(map.primary.x,map.primary.y,map.primary.width,map.primary.height);
			//secondary
			ctx.strokeStyle = "purple";
			ctx.strokeRect(map.secondary.x,map.secondary.y,map.secondary.width,map.secondary.height);
			//add pavement
			ctx.fillRect(map.primary.x,map.primary.y,map.primary.width,map.primary.height);
			ctx.fillRect(map.secondary.x,map.secondary.y,map.secondary.width,map.secondary.height);
			//heliPad
			ctx.strokeStyle = 'orange';
			ctx.beginPath();
			ctx.arc(map.heliPad.x,map.heliPad.y,map.heliPad.size,0,2*Math.PI);
	
			ctx.stroke();
			ctx.fill();
			ctx.restore();
			//add an image to the canvas
			
			//ctx.drawImage("../assets/images/tower.png",20,20);
			
			}
		},
		
		landingSpots = [map.primary, map.secondary, map.heliPad]
		//returns the runways & the map object
		return{
			landingSpots: landingSpots,
			gameMap : map 
		}
}());	