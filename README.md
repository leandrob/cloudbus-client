# CloudBus Node Client 0.1

> Node.js client for cloudbus service.

### Installation

```bash
$ npm install cloudbus-client
```

### Example

```javascript

var bus = require('cloudbus-client');

// 1. Configure...
bus.configure(function() {
	bus.host = "cloudbus.com";
	bus.key = "[your secret key here]";
});

// 2. Add services...
bus.service('/hello', function(req, res) {
	
	res.send("<h1>Welcome to cloudbus!</h1>");
});

bus.service('/hello/world', function(req, res) {
	
	// You can access to the request paramaters!
	var name = req.query.name;

	if (name) {
		res.send("<h1>Hello " + name + "</h1>");
		return;
	}

	res.send("<h1>Hello world!</h1>");
});

// 3. Publish and enjoy!
bus.publish();
```

### License (MIT)

Copyright (c) 2012, Leandro Boffi.

### Author: [Leandro Boffi][0]

[0]: http://github.com/leandrob/