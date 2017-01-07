"use strict";

function App(canvasId, canvasWidth, canvasHeight){
	this.canvasId = canvasId;
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
}

App.prototype = {
	init: function(){
		this.canvasObject = document.getElementById(this.canvasId);
		this.canvasObject.width = this.canvasWidth;
		this.canvasObject.height = this.canvasHeight;
	}
}

const app = new App("simulation", 400, 300);
app.init();