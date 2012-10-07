//nodebus.js
var relayTcpClient = require('./relayTcpClient.js');

var bus = module.exports;

bus.version = "0.0.1";
bus.host = "localhost";
bus.port = 7000;
bus.key = null;

var services = {},
	sockets = new Array();

bus.configure = function(configure) {
	configure();
};

bus.service = function(uri, handler) {

	if (services[uri]) {
		throw new Error('The address "' + uri + '"" is already registered in this.');
	};

	services[uri] = handler;
};

bus.publish = function() {

	var client = new relayTcpClient(bus.host, bus.port, bus.key);

	for(var key in services) {

		var socket = client.publishService(key, services[key]);
		sockets.push(socket);
	}
}

bus.close = function() {

}