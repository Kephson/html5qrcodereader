HTML5 QR-code reader - no flash, only html and javascript

Actual version: 1.0.1


A very basic QR-code reader based on:
- jQuery: http://jquery.com/
- Photobooth.js: http://wolframhempel.github.io/photobooth-js/
- QR-code library: https://github.com/LazarSoft/jsqrcode
- Say cheese: http://leemachin.github.io/say-cheese/


First example (index.html) uses photobooth.js to read an image 
from the webcam, but the width and height of the video is not correct.
I will correct it in future.

Second example (index_saycheese.html) uses saycheese.js to read 
from webcam and the video size is correct. At the moment this is 
the best working example.


Latest tested browser versions with webcam (03/2017):
- Chrome 56 (Windows 10, 64bit) -> Works
- Firefox 51.0.1 (Windows 10, 64bit) -> Works
- Opera 34 (Windows 10, 64bit) -> Works
- Edge 384 (Windows 10, 64bit) -> No webcam access
- Internet Explorer 11 (Windows 10, 64bit) -> No webcam access
- Firefox 51.0.3 (Android 5.1.0) -> Works
- Chrome 56 (Android 5.1.0) -> Problems with video stream, video freezes, only one camera found


Examples: 
- https://html5qrcode.ephra.im/ -> Photobooth.js
- https://html5qrcode.ephra.im/index_saycheese.html -> Say cheese


Usage:
Only clone or download this script and test it on your local webserver.
Make sure you're using HTTPS-protocol or localhost in Google Chrome.
Enjoy!


To-do:
- setting correct width and height of webcam stream for Photobooth.js
