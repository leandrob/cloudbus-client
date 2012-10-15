var dispatcher = module.exports,
Response = require('./Response.js');

dispatcher.process = function (socket, message, services) {

	if (message.message) {
		console.log(message.message);
		return;
	}

	if (message.error) {
		console.log("ERROR: " + message.error);
		return;
	}

	if (message.request) {
		var service = services[message.uri];
		if(!service){
			return;
		}

		var req = message.request;
		var res = new Response(socket);

		if(service.all) {
			service.all(req, res);
		}

		var handler = service[req.method.toLowerCase()];
		if(handler) {
			handler(req, res);
		}

		if(!service.all && !handler) {
			res.send(404);
		}
	}
}