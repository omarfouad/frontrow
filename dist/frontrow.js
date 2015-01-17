!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.frontrow=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var core = require('./core');
var defaults = require('./defaults');

function frontrow(elem, options) {
	var ops = options ? defaults(options) : defaults({});
	core.find(elem, ops);
}

module.exports = frontrow;
},{"./core":3,"./defaults":4}],2:[function(require,module,exports){
'use strict';

var loadFrom = {
	local: function(element) {
		return document.querySelector(element).innerHTML;
	}
	// TODO: Load content from remote file
};

module.exports = loadFrom;
},{}],3:[function(require,module,exports){
'use strict';

var ev = require('./event');
var render = require('./render');
var setup = require('./setup');
var position = require('./position');

function find(el, ops) {
	var element = {};
	element.el = document.querySelector('#' + el);
	element.options = ops;

	ev.click(element.el, init.bind(element));
}

function init() {
	var modal = render();
	setup(modal, this.options);
	position(modal);
}

module.exports = {
	find: find
};
},{"./event":5,"./position":6,"./render":7,"./setup":8}],4:[function(require,module,exports){
'use strict';

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
		confirmCallback: options.confirmCallback || function() {}
	};
	return ops;
}

module.exports = defaults;
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
'use strict';

var ev = require('./event');

function render () {
	var body = document.querySelector('body');
	var wrapper = document.createElement('div');
	var overlay = document.createElement('div');
	var container = document.createElement('div');
	var content = document.createElement('div');
	var closeButton = document.createElement('div');
	var header = document.createElement('div');
	var theBody = document.createElement('div');
	var footer = document.createElement('div');
	var okBtn = document.createElement('div');
	var cancelBtn = document.createElement('div');

	wrapper.setAttribute('id', 'frow-wrapper');
	overlay.setAttribute('id', 'frow-overlay');
	container.setAttribute('id', 'frow-container');
	content.setAttribute('id', 'frow-content');
	closeButton.setAttribute('id', 'frow-close');
	closeButton.setAttribute('href', '#');
	header.setAttribute('id', 'frow-header');
	theBody.setAttribute('id', 'frow-body');
	footer.setAttribute('id', 'frow-footer');
	okBtn.setAttribute('id', 'frow-ok-btn');
	cancelBtn.setAttribute('id', 'frow-cancel-btn');

	wrapper.appendChild(overlay);
	wrapper.appendChild(container);
	container.appendChild(content);
	content.appendChild(closeButton);
	content.appendChild(header);
	content.appendChild(theBody);
	content.appendChild(footer);
	footer.appendChild(okBtn);
	footer.appendChild(cancelBtn);
	body.appendChild(wrapper);

	theBody.innerHTML = '<div>Hello World!</div>';

	ev.click(closeButton, dispose.bind(wrapper));
	ev.click(cancelBtn, dispose.bind(wrapper));
	ev.click(overlay, dispose.bind(wrapper));

	show(wrapper);
	return wrapper;
}

function show(modal) {
	setTimeout(function() {
		modal.style.opacity = 1;
		document.querySelector('body').style.overflow = 'hidden';
	}, 10);
}

function dispose () {
	var modal = this;
	modal.style.opacity = 0.0;
	document.querySelector('body').style.overflow = 'scroll';
	setTimeout(function() {
		modal.parentNode.removeChild(modal);
	}, 250);
}

module.exports = render;
























},{"./event":5}],8:[function(require,module,exports){
'use strict';

var loadFrom = require('./content');

function setup (modal, options) {
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
	modal.click(modal.querySelector('#frow-ok-btn'), options.confirmCallback);

	return modal;
}

module.exports = setup;
},{"./content":2}]},{},[1])(1)
});