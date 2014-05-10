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

// build an 
function linkify(text) {
	if (text) {
		text = text.replace(/((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi,function(url) {
				var full_url = url;
				if (!full_url.match('^https?:\/\/')) {
					full_url = 'http://' + full_url;
				}
				return '<a href="' + full_url + '" target="blank">' + url + '</a>';
			}
		);
	}
	return text;
}