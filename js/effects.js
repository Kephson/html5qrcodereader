$(document).ready(function () {

	Webcam.attach('#example');

	$('#button').click(function () {
		take_snapshot();
	});

	qrcode.callback = showInfo;

});

function take_snapshot() {
	Webcam.snap(function (dataUrl) {
		qrCodeDecoder(dataUrl);
	});
}

// decode the img
function qrCodeDecoder(dataUrl) {
	qrcode.decode(dataUrl);
}

// show info from qr code
function showInfo(data) {
	$("#qrContent p").text(data);
}
