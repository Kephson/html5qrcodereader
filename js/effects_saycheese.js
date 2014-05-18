var codeFound = false;
var timer;
$(document).ready(function() {
	
	var test = 'Test 123 www.ephespage.de';
	console.log(linkify(test));

	var sayCheese = new SayCheese('#example', {audio: false});

	// do nothing on start
	sayCheese.on('start', function() {
		//console.log(this);
		//this.takeSnapshot();
	});

	// decode on snapshot
	sayCheese.on('snapshot', function(snapshot) {
		//console.log(snapshot);
		qrCodeDecoder(snapshot.toDataURL());
	});

	sayCheese.on('error', function(error) {
		$('#example').html('<p>Your browser does not support this plugin.</p>');
	});

	sayCheese.start();

	$('#button').click(function() {
		scanCode(sayCheese);
		//sayCheese.takeSnapshot();
	});

	$('#button2').click(function() {
		$('#example video').remove();
		sayCheese.start();
		$(this).hide();
		$('#button').show();
	});

	qrcode.callback = showInfo;

});

// recursive function for scanning code
function scanCode(snap) {
	snap.takeSnapshot();
	if (!codeFound) {
		timer = setTimeout(function() {
			scanCode(snap);
		}, 1000);
		//console.log('new scan');
	} else {
		clearTimeout(timer);
		snap.stop();
		$('#button').hide();
		$('#button2').show();
		//console.log('stop scan');
	}
}

// decode the img
function qrCodeDecoder(dataUrl) {
	qrcode.decode(dataUrl);
}

// show info from qr code
function showInfo(data) {
	var htmldata = linkify(data);
	$("#qrContent p").html(htmldata);
	
	if (data !== 'error decoding QR Code') {
		codeFound = true;
	}
}

// builds a link if there is an uri or a mail address
function linkify(inputText) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText;
}