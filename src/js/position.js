'use strict';

function position(modal) {
	var container = modal.querySelector('#frow-container');

	var left = Math.max(window.innerWidth - container.offsetWidth, 0) / 2;
	var top = Math.max(window.innerHeight - container.offsetHeight, 0) / 2;

	container.style.left = String(left + window.pageXOffset) + 'px';
	container.style.top = String(top + window.pageYOffset) + 'px';

	window.onresize = function() {
		position(modal);
	};
}

module.exports = position;