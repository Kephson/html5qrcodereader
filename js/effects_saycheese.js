
$(document).ready(function() {

	var sayCheese = new SayCheese('#example', {audio: false});

	// do nothing on start
	sayCheese.on('start', function() {
		//this.takeSnapshot();
	});

	// decode on snapshot
	sayCheese.on('snapshot', function(snapshot) {
		//console.log(snapshot);
		qrCodeDecoder(snapshot.toDataURL());
	});

	sayCheese.on('error', function(error) {
		$('#example').html('<p>Browser does not support this plugin.</p>');
	});

	sayCheese.start();

	$('#button').click(function() {
		sayCheese.takeSnapshot();
	});

	qrcode.callback = showInfo;

});

// decode the img
function qrCodeDecoder(dataUrl) {
	qrcode.decode(dataUrl);
}

// show info from qr code
function showInfo(data) {
	$("#qrContent p").text(data);
}