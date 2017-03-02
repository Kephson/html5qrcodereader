// user media
// inspired by https://www.simpl.info/getusermedia/sources/index.html

var videoSelect = document.querySelector('select#videoSource');

var gotSources = function (sourceInfos) {
	//console.log('Detecting user media video sources...');
	for (var i = 0; i !== sourceInfos.length; ++i) {
		var sourceInfo = sourceInfos[i];
		var option = document.createElement('option');
		option.value = sourceInfo.id;
		if (sourceInfo.kind === 'video') {
			option.text = sourceInfo.label || 'Camera '
					+ (videoSelect.length);
			videoSelect.appendChild(option);
			//console.log('Camera Source detected: ' + option.text);
		} else {
			//console.log('Other Source detected: ' + (sourceInfo.label || 'other ' + (videoSelect.length + 1)));
		}
	}
};

// detect user media
if (typeof MediaStreamTrack === 'undefined'
		|| typeof MediaStreamTrack.getSources === 'undefined') {
	//console.log('This browser does not support MediaStreamTrack.');
} else {
	//console.log('MediaStreamTrack supported.');
	MediaStreamTrack.getSources(gotSources);
}

var scanner;

function go() {
	//console.log('go!');

	if (scanner) {
		scanner.stop();
	}

	scanner = new SayCheese('#example', {
		snapshots: true,
		videoSource: videoSelect.value
	});

	scanner.on('error', function (error) {
		$('#example').html('<p>This plugin cannot run. Check if your browser blocks it.</p>');
	});

	scanner.on('snapshot', function (snapshot) {
		qrCodeDecoder(snapshot.toDataURL());
	});

	qrcode.callback = showInfo;

	scanner.on('success', function () {
		scanCode(scanner);
	});

	//console.log('starting scanner...');
	scanner.start();
}

// recursive function for scanning code
function scanCode(scanner) {
	//console.log('taking snapshot...');
	scanner.takeSnapshot();
	setTimeout(function () {
		scanCode(scanner);
	}, 1000);
}

// decode the img
function qrCodeDecoder(dataUrl) {
	qrcode.decode(dataUrl);
}

// show info from qr code
function showInfo(data) {
	if (data !== 'error decoding QR Code') {
		var htmldata = linkify(data);
		$("#qrContent").addClass('hasContent');
		$("#qrContent p").html(htmldata);
	} else {
		if ($("#qrContent").hasClass('hasContent')) {
		} else {
			$("#qrContent p").html('No QR Code in sight.');
		}
	}
}

// builds a link if there is an uri or a mail address
function linkify(inputText) {
	var replacedText, replacePattern1, replacePattern2, replacePattern3;

	//URLs starting with http://, https://, or ftp://
	replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
	replacedText = inputText.replace(replacePattern1,
			'<a href="$1" target="_blank">$1</a>');

	//URLs starting with "www." (without // before it, or it'd re-link the ones done above).
	replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
	replacedText = replacedText.replace(replacePattern2,
			'$1<a href="http://$2" target="_blank">$2</a>');

	//Change email addresses to mailto:: links.
	replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
	replacedText = replacedText.replace(replacePattern3,
			'<a href="mailto:$1">$1</a>');

	return replacedText;
}
