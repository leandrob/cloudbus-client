module.exports = function(socket) {
	socket.send	= function(data) { 
		socket.write(JSON.stringify(data)); 
	}

	socket.publish = function(key, uris) {
		socket.send({
			action: 'publish',
			key: key,
			uris: uris
		});
	}

	socket.response = function(data) {
		socket.send({
			action: 'response',
			response: data
		});
	}	
}