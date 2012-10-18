var cloudBusSocket = module.exports;

cloudBusSocket.init = function (socket) {
	socket.name = socket.socket.remoteAddress + ':' + socket.socket.remotePort;

	socket.publish = function(key, uris) {
		socket.send(['publish'], {
			key: key,
			uris: uris
		});
	}

	socket.response = function(data, requestId) {
		socket.send(['response'], {
			response: data,
			requestId: requestId
		});
	}
}