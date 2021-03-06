'use strict';

var dispose = require('./dispose');

function defaults(options) {
	var ops = {
		title: options.title || 'Frontrow!',
		confirmBtnText: options.confirmBtnText || 'Confirm',
		cancelBtnText: options.cancelBtnText || 'cancel',
		overlayColor: options.overlayColor || 'white',
		overlayOpacity: options.overlayOpacity || 0.8,
		content: options.content || '#frow-body',
		width: options.width || '300px',
		height: options.height || null,
		confirmCallback: options.confirmCallback || dispose,
		openCallback: options.openCallback || function() {}
	};
	return ops;
}

module.exports = defaults;
