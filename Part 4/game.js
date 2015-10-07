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

	createPlayer: function(openCells) {
		var index = Math.floor(ROT.RNG.getUniform() * openCells.length);
                var pos = openCells.splice(index, 1)[0];
    		var posArr = pos.split(",");
    		var x = parseInt(posArr[0]);
    		var y = parseInt(posArr[1]);
    		this.player = new Player(x, y);
	},

	createMap: function() {
		var digger = new ROT.Map.Digger();
		var openCells = [];
		digger.create(function (x, y, ele) {
			if (ele) {
				return;
			}
			var pos = x + ',' + y;
			openCells.push(pos);
			this.map[pos] = ".";
		}.bind(this));
		this.drawMap();
		this.createPlayer(openCells);
		this.player.draw();
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
	engine: null,
	player: null,
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
		this.player.enableMovement();
	}

};

var Player = function(x, y) {
	this.x = x;
	this.y = y;
	this.draw = function() {
		Game.display.draw(this.x, this.y, "@", Game.colors.green);
	};
	this.enableMovement = function() {
		window.addEventListener("keydown", this);
	};
	this.handleEvent = function(e) {
	  var keyMap = {
	  	38: 0,
	  	39: 2,
	  	40: 4,
	  	37: 6,
	  };
	  if (!(e.keyCode in keyMap)) {
	  	return;
	  }

	  var dir = ROT.DIRS[8][keyMap[e.keyCode]];
	  var newX = this.x + dir[0];
	  var newY = this.y + dir[1];
	  var newPos = newX + "," + newY;
	  if (!(newPos in Game.map)) {
	  	return;
	  }

	  Game.display.draw(this.x, this.y, Game.map[this.x+","+this.y]);
	  this.x = newX;
	  this.y = newY;
	  this.draw();	
	};
}

Game.init();

