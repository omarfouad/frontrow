!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.frontrow=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var core = require('./core');
var dispose = require('./dispose');

core.dispose = dispose;

module.exports = core;
},{"./core":4,"./dispose":6}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
'use strict';

var loadFrom = {
	local: function(element) {
		return document.querySelector(element).innerHTML;
	}
	// TODO: Load content from remote file
};

module.exports = loadFrom;

},{}],4:[function(require,module,exports){
'use strict';

var events = require('./events');
var defaults = require('./defaults');
var modal = require('./modal');
var index = require('./index');
var nope;

function core(elem, options) {
	var el = document.querySelector('#' + elem);
	if(el === null) {
		return;
	}

	var exists = index.find(el);
	if (exists !== nope) {
		return;
	}

	var instance;
	var ops = options ? defaults(options) : defaults({});

	instance = modal(el, ops);
	instance.identifier = index.add(el, instance);

	events.add(instance.el, 'click', instance.show);

	return instance;
}

module.exports = core;
},{"./defaults":5,"./events":7,"./index":8,"./modal":9}],5:[function(require,module,exports){
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

},{"./dispose":6}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
/*
  Courtesy of Nicolas Bevacqua
  github.com/bevacqua
*/

'use strict';

var addEvent = addEventEasy;
var removeEvent = removeEventEasy;

if (!window.addEventListener) {
  addEvent = addEventHard;
}

if (!window.removeEventListener) {
  removeEvent = removeEventHard;
}

function addEventEasy (element, evt, fn, capture) {
  return element.addEventListener(evt, fn, capture);
}

function addEventHard (element, evt, fn, capture) {
  return element.attachEvent('on' + evt, function (ae) {
    var e = ae || window.event;
    e.target = e.target || e.srcElement;
    e.preventDefault  = e.preventDefault || function preventDefault () { e.returnValue = false; };
    e.stopPropagation = e.stopPropagation || function stopPropagation () { e.cancelBubble = true; };
    fn.call(element, e);
  }, capture);
}

function removeEventEasy (element, evt, fn) {
  return element.removeEventListener(evt, fn);
}

function removeEventHard (element, evt, fn) {
  return element.detachEvent('on' + evt, fn);
}

module.exports = {
  add: addEvent,
  remove: removeEvent
};

},{}],8:[function(require,module,exports){
'use strict';

var index = [];
var key = 'data-frontrow-id';

function find(el) {
	if (el && el.getAttribute) {
		return index[el.getAttribute(key) - 1];
	}
}

function add(el, instance) {
	var id = index.push(instance);
	el.setAttribute(key, id);
	return id;
}

module.exports = {
	find: find,
	add: add
};
},{}],9:[function(require,module,exports){
'use strict';

var render = require('./render');
var setup = require('./setup');
var position = require('./position');
var appearing = require('./appearing');

function modal(elem, options) {
	var api = {};

	api.el = elem;
	api.options = options;

	function show() {
		if (appearing()) {
			return;
		}

		var modal = render(api.identifier);
		setup(api.options);
		position(modal);

		return api;
	}

	function set(option, value) {
		api.options[option] = value;

		if (appearing() === String(api.identifier)) {
			setup(api.options);
		}

		return api;
	}

	api.show = show;
	api.set = set;

	return api;
}

module.exports = modal;

},{"./appearing":2,"./position":10,"./render":11,"./setup":12}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
'use strict';

var events = require('./events');
var dispose = require('./dispose');
var defaults = require('./defaults');
var key = 'data-frontrow-id';

function render (identifier) {
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
	wrapper.setAttribute(key, identifier);
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

	events.add(closeButton, 'click', dispose);
	events.add(cancelBtn, 'click', dispose);
	events.add(overlay, 'click', dispose);

	show(wrapper);
	return wrapper;
}

function show(modal) {
	setTimeout(function() {
		modal.style.opacity = 1;
		document.querySelector('body').style.overflow = 'hidden';
	}, 10);
}

module.exports = render;
























},{"./defaults":5,"./dispose":6,"./events":7}],12:[function(require,module,exports){
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

	options.openCallback()

	return modal;
}

module.exports = setup;

},{"./content":3,"./events":7}]},{},[1])(1)
});