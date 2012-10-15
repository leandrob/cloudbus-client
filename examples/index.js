var bus = require('../lib/');

bus.configure(function() {
	bus.host = "cloud-bus.net";
	bus.key = "8a79f8969ef76de41911d052a473d87309fcddd049edee00";
});

bus.get('/hello', function(req, res) {
	res.send('helloooooo!')
});

bus.post('/hello', function(req, res) {

	res.send('hello ' + req.body.user);
});

bus.publish();

console.log('Connected...');