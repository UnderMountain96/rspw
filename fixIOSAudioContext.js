(function() {
	window.AudioContext = new (window.AudioContext || window.webkitAudioContext);
	
	var fixAudioContext = function (e) {
		if (window.AudioContext) {
			// Create empty buffer
			var buffer = window.AudioContext.createBuffer(1, 1, 22050);
			var source = window.AudioContext.createBufferSource();
			source.buffer = buffer;
			// Connect to output (speakers)
			source.connect(window.AudioContext.destination);
			// Play sound
			if (source.start) {
				source.start(0);
			} else if (source.play) {
				source.play(0);
			} else if (source.noteOn) {
				source.noteOn(0);
			}
		}
		// Remove events
		document.removeEventListener('touchstart', fixAudioContext);
		document.removeEventListener('touchend', fixAudioContext);
	};
	// iOS 6-8
	document.addEventListener('touchstart', fixAudioContext);
	// iOS 9
	document.addEventListener('touchend', fixAudioContext);
})();