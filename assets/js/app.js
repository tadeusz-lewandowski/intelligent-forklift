"use strict";

// forklift object

function Forklift(forkliftPosition, forkliftSize, color){
	this.position = {};
	this.startPosition = {
		x: forkliftPosition.x,
		y: forkliftPosition.y
	}
	this.setPosition(forkliftPosition.x, forkliftPosition.y);
	this.size = {
		width: forkliftSize.width,
		height: forkliftSize.height,		
	}
	this.color = color;
}

Forklift.prototype = {
	setPosition: function(x, y){
		this.position.x = x;
		this.position.y = y;
	},
	movePackage: function(fromIndex, toIndex, shelvesReference, simulationReference){
		const destination = shelvesReference[toIndex];
		const source = shelvesReference[fromIndex]
		if(destination.package != null) return;

		const destinationPackage = source.package;

		
		function delay(t) {
		   return new Promise(function(resolve) { 
		       setTimeout(resolve, t)
		   });
		}

		delay(1000).then(() => {
			source.package = null;
			this.setPosition(source.position.x > this.position.x ? source.position.x - 80 : source.position.x + 80, source.position.y)
			simulationReference.render();

			return delay(1000)
		}).then(() => {
			destination.package = destinationPackage;
			this.setPosition(destination.position.x > this.position.x ? destination.position.x - 80 : destination.position.x + 80, destination.position.y)
			simulationReference.render();

			return delay(1000)
		}).then(() => {
			this.setPosition(this.startPosition.x, this.startPosition.y);
			simulationReference.render();
		});

	}
}

// Simulation object - canvas

function Simulation(canvasId, canvasWidth, canvasHeight, forkliftPosition, forkliftSize, forkliftColor, shelvesArray){
	this.canvasId = canvasId;
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.setShelves(shelvesArray);
	this.forklift = new Forklift(forkliftPosition, forkliftSize, forkliftColor);
}

Simulation.prototype = {
	init: function(){
		const canvas = document.getElementById(this.canvasId);
		canvas.width = this.canvasWidth;
		canvas.height = this.canvasHeight;
		this.canvasObject = canvas.getContext('2d');
		// this.forklift.movePackage(0, 6, this.shelves, this);
				
	},
	setShelves: function(shelvesArray){
		this.shelves = shelvesArray;
	},
	drawShelves: function(){
		const simulation = this.canvasObject;

		this.shelves.forEach((shelve) => {
			
			if(shelve.package == null){
				simulation.beginPath();
				simulation.lineWidth="4";
				simulation.strokeStyle="white";
				simulation.rect(shelve.position.x, shelve.position.y, shelve.size.width, shelve.size.height); 
				simulation.stroke();
				
			} else{
				
				simulation.fillStyle = shelve.package.color;
	        	simulation.fillRect(shelve.position.x, shelve.position.y, shelve.size.width, shelve.size.height);
			}
			
		});
	},
	drawForklift: function(){
		const simulation = this.canvasObject;
		const forklift = this.forklift;
		simulation.fillStyle = forklift.color;
    	simulation.fillRect(forklift.position.x, forklift.position.y, forklift.size.width, forklift.size.height);
	},
	render: function(){
		this.canvasObject.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		this.drawShelves();
		this.drawForklift();
	}
}

function Parser(sentenceId, parseId, shelvesReference){
	this.inputSentence = document.getElementById(sentenceId);
	this.buttonParse = document.getElementById(parseId);
	this.buttonParse.addEventListener("click", this.parseSentence.bind(this));
	this.sentence = "";
	this.shelves = shelvesReference;
}

Parser.prototype = {
	parseSentence: function(){
		const sentence = this.inputSentence.value;

		if(/((U|u)mie..|(P|p)rzenie.) .* pacz.. ko.. .* paczki+/.test(sentence)){
			console.log("Pasuje");
			let words = sentence.split(" ");
			console.log(words)
			console.log(words.search(/ziel.*/))
		} else{
			console.log("nie pasuje")
		}
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
	},
	{
		position: {
			x: 800,
			y: 60
		},
		size: {
			width: 60,
			height: 60
		},
		package: {
			color: "pink",
			size: 60,
			weight: 20
		}
	},
	{
		position: {
			x: 800,
			y: 140
		},
		size: {
			width: 60,
			height: 60
		},
		package: {
			color: "aqua",
			size: 60,
			weight: 20
		}
	},
	{
		position: {
			x: 800,
			y: 220
		},
		size: {
			width: 60,
			height: 60
		},
		package: null
	},
];

const c = new Simulation("simulation", 1080, 720, {x: 440, y: 60}, {width: 60, height: 60}, "white", shelves);
c.init();
c.render();

const p = new Parser("sentence", "parse")
// c.drawShelves();
// c.drawForklift();