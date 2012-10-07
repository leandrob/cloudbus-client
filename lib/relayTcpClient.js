var net = require('net');

module.exports = function relayTcpClient (host, port, key) {

  this.publishService = function(url, handler) {

    var socket = net.connect(port, host, function() { 
      
      var data = { 
        path: url, 
        action: 'register',
        key: key
      };

      socket.write(JSON.stringify(data));
    });

    socket.on('data', function(data) {      
      var req = JSON.parse(data);
      handler(req, new Response(socket));
    });

    return socket;
  };
}

function Response(socket) {

  this.send = function(message) {

    var res = { response: message };

    socket.write(JSON.stringify(res));
  };
}