'use strict';

var loadFrom = require('./content');
var events = require('./events');

function setup (options) {
	var modal = document.querySelector('#frow-wrapper');
	if (!modal) {
		return;
	}

	modal.querySelector('#frow-header').innerHTML = options.title;
	modal.querySelector('#frow-cancel-btn').innerHTML = options.cancelBtnText;
	modal.querySelector('#frow-ok-btn').innerHTML = options.confirmBtnText;
	modal.querySelector('#frow-overlay').style.backgroundColor = options.overlayColor;
	modal.querySelector('#frow-overlay').style.opacity = options.overlayOpacity;
	modal.querySelector('#frow-body').innerHTML = loadFrom.local(options.content);

	if (options.width === 'auto') {
		modal.querySelector('#frow-container').style.maxWidth = 'none';
		modal.querySelector('#frow-container').style.width = 'inherit';
	}else{
		modal.querySelector('#frow-container').style.maxWidth = options.width;
	}
	
	modal.querySelector('#frow-body').style.height = options.height;
	events.add(modal.querySelector('#frow-ok-btn'), 'click', options.confirmCallback);

	return modal;
}

module.exports = setup;