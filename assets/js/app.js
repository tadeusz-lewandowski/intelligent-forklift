"use strict";





// Simulation object - canvas

function Simulation(canvasId, canvasWidth, canvasHeight){
	this.canvasId = canvasId;
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.shelves = [];
}

Simulation.prototype = {
	init: function(){
		this.canvasObject = document.getElementById(this.canvasId);
		this.canvasObject.width = this.canvasWidth;
		this.canvasObject.height = this.canvasHeight;		
	},
	setShelves: function(shelvesArray){
		this.shelves = shelvesArray;
	}
}

const c = new Simulation("simulation", 1080, 720);
c.init();
c.setShelves([
	{
		name: "dwq"
	},
	{
		name: "dvvvv"
	}
]);




// function App(canvasId, canvasWidth, canvasHeight){
// 	this.canvasId = canvasId;
// 	this.canvasWidth = canvasWidth;
// 	this.canvasHeight = canvasHeight;
// }

// App.prototype = {
// 	init: function(){
// 		this.canvasObject = document.getElementById(this.canvasId);
// 		this.canvasObject.width = this.canvasWidth;
// 		this.canvasObject.height = this.canvasHeight;
// 	}
// }

// const app = new App("simulation", 400, 300);
// app.init();