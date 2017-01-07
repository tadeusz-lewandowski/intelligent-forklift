"use strict";



function Forklift(forkliftPosition, forkliftSize, color){
	this.position = {
		x: forkliftPosition.x,
		y: forkliftPosition.y
	}
	this.size = {
		width: forkliftSize.width,
		height: forkliftSize.height,		
	}
	this.color = color;
}

// Simulation object - canvas

function Simulation(canvasId, canvasWidth, canvasHeight){
	this.canvasId = canvasId;
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.shelves = [];
}

Simulation.prototype = {
	init: function(){
		const canvas = document.getElementById(this.canvasId);
		canvas.width = this.canvasWidth;
		canvas.height = this.canvasHeight;
		this.canvasObject = canvas.getContext('2d');
				
	},
	setShelves: function(shelvesArray){
		this.shelves = shelvesArray;
	},
	drawShelves: function(){
		const simulation = this.canvasObject;

		this.shelves.forEach((shelve) => {
			if(shelve.package == null){
				simulation.lineWidth="4";
				simulation.strokeStyle="white";
				simulation.rect(shelve.position.x, shelve.position.y, shelve.size.width, shelve.size.height); 
				simulation.stroke();	
			} else{
				simulation.fillStyle = shelve.package.color;
	        	simulation.fillRect(shelve.position.x, shelve.position.y, shelve.size.width, shelve.size.height);
			}
		});
	}
}

const shelves = [
	{
		position: {
			x: 60,
			y: 60
		},
		size: {
			width: 60,
			height: 60
		},
		package: {
			color: "red",
			size: 60,
			weight: 20
		}
	},
	{
		position: {
			x: 60,
			y: 140
		},
		size: {
			width: 60,
			height: 60
		},
		package: {
			color: "blue",
			size: 40,
			weight: 20
		}
	},
	{
		position: {
			x: 60,
			y: 220
		},
		size: {
			width: 60,
			height: 60
		},
		package: {
			color: "orange",
			size: 30,
			weight: 60
		}
	},
	{
		position: {
			x: 60,
			y: 300
		},
		size: {
			width: 60,
			height: 60
		},
		package: null
	}
];

const c = new Simulation("simulation", 1080, 720);
c.init();
c.setShelves(shelves);
c.drawShelves()