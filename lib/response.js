module.exports = function (socket, requestId) {
	
	var dataSent = false;

	this.send = function(data) {
		if(dataSent) {
			throw 'Data has already been sent.';
		}
		
		dataSent = true;
		socket.response(data, requestId);
	}
}