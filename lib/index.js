var bus = module.exports,
client = require('./client.js');

bus.version = "0.0.3";
bus.host = "cloud-bus.net";
bus.port = 7000;
bus.key = null;

var services = {};

bus.configure = function(configure) {
	configure();
};

bus.service = function(method, uri, handler) {
	method = method.toLowerCase();
	
	if (!services[uri]) {
		services[uri] = {};
	};

	if(services[uri][method]) {
		throw 'There is already a handler registered for the uri "' + uri +'" and the http method "' + method + '".'
	}

	services[uri][method] = handler;
};

bus.get = function(uri, handler) { bus.service('get', uri, handler); };
bus.post = function(uri, handler) { bus.service('post', uri, handler); };
bus.put = function(uri, handler) { bus.service('put', uri, handler); };
bus.delete = function(uri, handler) { bus.service('delete', uri, handler); };
bus.options = function(uri, handler) { bus.service('options', uri, handler); };
bus.head = function(uri, handler) { bus.service('head', uri, handler); };

bus.publish = function() {
	client.host = bus.host;
	client.port = bus.port;
	client.key = bus.key;

	client.publish(services);
}