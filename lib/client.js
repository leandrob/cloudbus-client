var net = require('net'),
socketExtensions = require('./socketExtensions'),
dispatcher = require('./dispatcher.js');

var client = module.exports;

client.publish = function(services) {
  var socket = net.connect(client.port, client.host, function() { 
    socketExtensions(socket);
    
    socket.on('data', dataHandler);

    var uris = new Array();
    for (var uri in services) {
      uris.push(uri);
    };

    socket.publish(client.key, uris);
  });

  function dataHandler(data) {
    //TODO: Replace this with regex
    var messages = data.toString()
    .split('[cloudbus-message]')
    .map(function(e) { 
      return e.replace('[/cloudbus-message]', ''); 
    });

    for(var index in messages) {
      var message = messages[index];
      if (message != '') {;
        dispatcher.process(socket, JSON.parse(message), services);
      }
    }
  }
}
