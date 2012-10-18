var net = require('net'),
nssocket = require('nssocket'),
cloudBusSocket = require('./cloudBusSocket.js'),
Response = require('./response.js');

var client = module.exports;

client.publish = function(services) {

  var socket2 = new net.Socket({ type: 'tcp4'}),
  nsSocket = nssocket.NsSocket(socket2);

  nsSocket.connect(client.port, client.host, function() { 
    var socket = nsSocket;

    cloudBusSocket.init(socket);
    
    socket.data(['info'], function(info) { 
      console.log(info.message);
    });

    socket.data(['error'], function(error) {
      console.log(error.code + " " + error.message)
    });

    socket.data(['request'], function(request) {
      var service = services[request.uri];

      if(!service){
        return;
      }

      var req = request.request;
      var res = new Response(socket, request.requestId);

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
    })

    var uris = new Array();
    for (var uri in services) {
      uris.push(uri);
    };

    socket.publish(client.key, uris);
  });
}
