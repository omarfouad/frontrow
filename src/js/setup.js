'use strict';

var loadFrom = require('./content');
var ev = require('./event');

function setup (modal, options) {
	modal.querySelector('#frow-header').innerHTML = options.title;
	modal.querySelector('#frow-cancel-btn').innerHTML = options.cancelBtnText;
	modal.querySelector('#frow-ok-btn').innerHTML = options.confirmBtnText;
	modal.querySelector('#frow-overlay').style.backgroundColor = options.overlayColor;
	modal.querySelector('#frow-overlay').style.opacity = options.overlayOpacity;
	modal.querySelector('#frow-body').innerHTML = loadFrom.local(options.content);
	modal.querySelector('#frow-container').style.maxWidth = options.width;
	modal.querySelector('#frow-body').style.height = options.height;
	ev.click(modal.querySelector('#frow-ok-btn'), options.confirmCallback);
}

module.exports = setup;