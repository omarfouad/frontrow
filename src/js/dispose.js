'use strict';

function dispose() {
	var modal = document.querySelector('#frow-wrapper');
	if (modal !== null) {
		modal.style.opacity = 0.0;
		document.querySelector('body').style.overflow = 'scroll';
		
		setTimeout(function() {
			modal.parentNode.removeChild(modal);
		}, 250);
	}
}

module.exports = dispose;