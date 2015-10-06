// game.js

var Game = {

	// Helper functions

	createDisplay: function(displayWidth, displayHeight) {
		return new ROT.Display({width: displayWidth, height: displayHeight});
	},

	createContainer: function(displayObject) {
		return displayObject.getContainer();
	},

	createColors: function(foregroundColor, backgroundColor) {
		return "%c{" + foregroundColor + "}%b{" + backgroundColor + "}";
	},

	createText: function(colors, string) {
		return colors + string;
	},

	createMap: function() {
		var digger = new ROT.Map.Digger();
		digger.create(function (x, y, ele) {
			if (ele) {
				return;
			}
			var pos = x + ',' + y;
			this.map[pos] = ".";
		}.bind(this));
		this.drawMap();
	},

	drawMap: function() {
		for (var loc in this.map) {
			var posArr = loc.split(",");
			var x = parseInt(posArr[0], 10);
			var y = parseInt(posArr[1], 10);
			this.display.draw(x, y, this.map[loc]);
		}
	},

	// Parameter stores
	
	display: null,
	
	container: null,
	
	map: {},

	gameOptions: {
		width: 80,
		height: 40
	},

	colors: {
		white:  ROT.Color.toRGB([255,255,255]),
		black: ROT.Color.toRGB([0,0,0]),
		red: ROT.Color.toRGB([255,0,0]),
		green: ROT.Color.toRGB([0,255,0]),
	},

	colorCombos : {},

	// Game Setup
	
	init: function() {
		this.display = this.createDisplay(this.gameOptions.width, this.gameOptions.height);
		this.container = this.createContainer(this.display);
		
		document.body.appendChild(this.container);

		this.colorCombos.whiteBlack = this.createColors(this.colors.white, this.colors.black);
        	this.colorCombos.greenRed = this.createColors(this.colors.green, this.colors.red);

		var title = this.createText(this.colorCombos.greenRed, "rot.js Tutorial");
		this.display.drawText(0, 0, title);
		this.createMap();
	}

};

Game.init();

