module.exports = function (socket) {
	
	var dataSent = false;

	this.send = function(data) {
		if(dataSent) {
			throw 'Data has already been sent.'
		}
		dataSent = true;
		socket.response(data);
	}
}