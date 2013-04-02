var app = require('express')(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	path = require('path');

server.listen(80);
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/pongBasic.client.html');
});
app.get('/npm_crafty.js', function (req, res) {
	res.sendfile(path.join(__dirname + '/../lib' + '/npm_crafty.js'));
});
app.get('/npm_crafty.net.js', function (req, res) {
	res.sendfile(path.join(__dirname + '/../lib' + '/npm_crafty.net.js'));
});
app.get('/crafty_client.js', function (req, res) {
	res.sendfile(path.join(__dirname + '/../lib' + '/crafty_client.js'));
});

io.sockets.on('connection', function (socket) {
	startSession(socket);
	
	console.log("Connected ", socket.id);
	socket.on('disconnect', function (arg) {
		console.log("Disconnected ", socket.id);
	});
});



io.set('log level', 1);

app.get('/pongBasic.game.js', function (req, res) {
	res.sendfile(__dirname + '/pongBasic.game.js');
});

var startSession = function(socket) {
	//load module
	var craftyModule = require('../lib/npm_crafty');
	//create Crafty Server
	Crafty = craftyModule.createServer();
	//bind to socket
	craftyModule.toClient(socket, Crafty);
	
	
	var pongBasic = require('./pongBasic.game.js');
	pongBasic.startGame(Crafty, false);
}
	