// game.js

// Parameter stores
var gameOptions = {
	width: 50,
	height: 30
};

var colors = {
	white: ROT.Color.toRGB([255,255,255]),
	black: ROT.Color.toRGB([0,0,0]),
	red: ROT.Color.toRGB([255,0,0]),
	green: ROT.Color.toRGB([0,255,0]),
};

var colorCombos = {};

// Helper functions

var createDisplay = function(displayWidth, displayHeight) {
	return new ROT.Display({width: displayWidth, height: displayHeight});
};

var createContainer = function(displayObject) {
	return displayObject.getContainer();
};

var createColors = function(foregroundColor, backgroundColor) {
	return "%c{" + foregroundColor + "}%b{" + backgroundColor + "}";
};

var createText = function(colors, string) {
	return colors + string;
};

// Game Setup
var init = function() {
	var display = createDisplay(gameOptions.width,gameOptions.height);
	var container = createContainer(display);
	document.body.appendChild(container);

	colorCombos.whiteBlack = createColors(colors.white, colors.black);
	colorCombos.greenRed = createColors(colors.green, colors.red);

	var title = createText(colorCombos.greenRed, "rot.js Tutorial");
	var greeting = createText(colorCombos.whiteBlack, "Hello, World!");
	display.drawText(0, 0, title);
	display.drawText(18, 14, greeting);
};

init();

