var bus = require('../lib/');

bus.configure(function() {
	bus.host = "cloudbus.com";
	bus.key = "2e796f85308dbbeeb6ec7bbefcbcbae3571c5bf34c499b52";
});

bus.service('/hello', function(req, res) {
	
	res.send("<h1>Welcome to cloudbus!</h1>");

});

bus.service('/hello/world', function(req, res) {
	
	var name = req.query.name;

	if (name) {
		res.send("<h1>Hello " + name + "</h1>");
		return;
	}

	res.send("<h1>Hello world!</h1>");
});

bus.publish();

console.log('Connected...');