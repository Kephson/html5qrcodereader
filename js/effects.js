
$(document).ready(function() {

	// for webcam support
	$('#example').photobooth().on("image", function(event, dataUrl) {
		//$("#hiddenImg").html('<img src="' + dataUrl + '" >');
		qrCodeDecoder(dataUrl);
		//console.log(event);
		//console.log(dataUrl);
		//console.log($('#example').data( "photobooth" ));
	});

	$('#button').click(function() {
		$('.trigger').trigger('click');
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