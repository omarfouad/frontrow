'use strict';

var nope;
var key = 'data-frontrow-id';

function appearing() {
	var el = document.querySelector('#frow-wrapper');

	if (el === nope || el === null) {
		return false;
	}else{
		return el.getAttribute(key);
	}
}

module.exports = appearing;