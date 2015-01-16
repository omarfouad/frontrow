'use strict';

var ev = {
	click: function(el, cb) {
		if(el.addEventListener) {
			el.addEventListener('click', function() { cb(); });	
		}else if(el.attachEvent) {
			el.attachEvent('click', function() { cb(); });
		}
	}
};

module.exports = ev;