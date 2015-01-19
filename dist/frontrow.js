!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.frontrow=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var core = require('./core');
var dispose = require('./dispose');

core.dispose = dispose;

module.exports = core;
},{"./core":3,"./dispose":5}],2:[function(require,module,exports){
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

var events = require('./events');
var render = require('./render');
var setup = require('./setup');
var position = require('./position');
var defaults = require('./defaults');

function core(elem, options) {
	var element = {};
	element.el = document.querySelector('#' + elem);
	element.options = options ? defaults(options) : defaults({});

	events.add(element.el, 'click', init.bind(element));
}

function init() {
	var modal = render();
	setup(modal, this.options);
	position(modal);
}

module.exports = core;
},{"./defaults":4,"./events":6,"./position":7,"./render":8,"./setup":9}],4:[function(require,module,exports){
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
		confirmCallback: options.confirmCallback || dispose
	};
	return ops;
}

module.exports = defaults;
},{"./dispose":5}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
'use strict';

var events = require('./events');
var dispose = require('./dispose');

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
























},{"./dispose":5,"./events":6}],9:[function(require,module,exports){
'use strict';

var loadFrom = require('./content');
var events = require('./events');

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
	events.add(modal.querySelector('#frow-ok-btn'), 'click', options.confirmCallback);

	return modal;
}

module.exports = setup;
},{"./content":2,"./events":6}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZnJvbnRyb3cuanMiLCJzcmMvanMvY29udGVudC5qcyIsInNyYy9qcy9jb3JlLmpzIiwic3JjL2pzL2RlZmF1bHRzLmpzIiwic3JjL2pzL2Rpc3Bvc2UuanMiLCJzcmMvanMvZXZlbnRzLmpzIiwic3JjL2pzL3Bvc2l0aW9uLmpzIiwic3JjL2pzL3JlbmRlci5qcyIsInNyYy9qcy9zZXR1cC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY29yZSA9IHJlcXVpcmUoJy4vY29yZScpO1xudmFyIGRpc3Bvc2UgPSByZXF1aXJlKCcuL2Rpc3Bvc2UnKTtcblxuY29yZS5kaXNwb3NlID0gZGlzcG9zZTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb3JlOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGxvYWRGcm9tID0ge1xuXHRsb2NhbDogZnVuY3Rpb24oZWxlbWVudCkge1xuXHRcdHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpLmlubmVySFRNTDtcblx0fVxuXHQvLyBUT0RPOiBMb2FkIGNvbnRlbnQgZnJvbSByZW1vdGUgZmlsZVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBsb2FkRnJvbTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBldmVudHMgPSByZXF1aXJlKCcuL2V2ZW50cycpO1xudmFyIHJlbmRlciA9IHJlcXVpcmUoJy4vcmVuZGVyJyk7XG52YXIgc2V0dXAgPSByZXF1aXJlKCcuL3NldHVwJyk7XG52YXIgcG9zaXRpb24gPSByZXF1aXJlKCcuL3Bvc2l0aW9uJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbmZ1bmN0aW9uIGNvcmUoZWxlbSwgb3B0aW9ucykge1xuXHR2YXIgZWxlbWVudCA9IHt9O1xuXHRlbGVtZW50LmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycgKyBlbGVtKTtcblx0ZWxlbWVudC5vcHRpb25zID0gb3B0aW9ucyA/IGRlZmF1bHRzKG9wdGlvbnMpIDogZGVmYXVsdHMoe30pO1xuXG5cdGV2ZW50cy5hZGQoZWxlbWVudC5lbCwgJ2NsaWNrJywgaW5pdC5iaW5kKGVsZW1lbnQpKTtcbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcblx0dmFyIG1vZGFsID0gcmVuZGVyKCk7XG5cdHNldHVwKG1vZGFsLCB0aGlzLm9wdGlvbnMpO1xuXHRwb3NpdGlvbihtb2RhbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29yZTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBkaXNwb3NlID0gcmVxdWlyZSgnLi9kaXNwb3NlJyk7XG5cbmZ1bmN0aW9uIGRlZmF1bHRzKG9wdGlvbnMpIHtcblx0dmFyIG9wcyA9IHtcblx0XHR0aXRsZTogb3B0aW9ucy50aXRsZSB8fCAnRnJvbnRyb3chJyxcblx0XHRjb25maXJtQnRuVGV4dDogb3B0aW9ucy5jb25maXJtQnRuVGV4dCB8fCAnQ29uZmlybScsXG5cdFx0Y2FuY2VsQnRuVGV4dDogb3B0aW9ucy5jYW5jZWxCdG5UZXh0IHx8ICdjYW5jZWwnLFxuXHRcdG92ZXJsYXlDb2xvcjogb3B0aW9ucy5vdmVybGF5Q29sb3IgfHwgJ3doaXRlJyxcblx0XHRvdmVybGF5T3BhY2l0eTogb3B0aW9ucy5vdmVybGF5T3BhY2l0eSB8fCAwLjgsXG5cdFx0Y29udGVudDogb3B0aW9ucy5jb250ZW50IHx8ICcjZnJvdy1ib2R5Jyxcblx0XHR3aWR0aDogb3B0aW9ucy53aWR0aCB8fCAnMzAwcHgnLFxuXHRcdGhlaWdodDogb3B0aW9ucy5oZWlnaHQgfHwgbnVsbCxcblx0XHRjb25maXJtQ2FsbGJhY2s6IG9wdGlvbnMuY29uZmlybUNhbGxiYWNrIHx8IGRpc3Bvc2Vcblx0fTtcblx0cmV0dXJuIG9wcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0czsiLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG5cdHZhciBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmcm93LXdyYXBwZXInKTtcblx0aWYgKG1vZGFsICE9PSBudWxsKSB7XG5cdFx0bW9kYWwuc3R5bGUub3BhY2l0eSA9IDAuMDtcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jykuc3R5bGUub3ZlcmZsb3cgPSAnc2Nyb2xsJztcblx0XHRcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0bW9kYWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChtb2RhbCk7XG5cdFx0fSwgMjUwKTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpc3Bvc2U7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWRkRXZlbnQgPSBhZGRFdmVudEVhc3k7XG52YXIgcmVtb3ZlRXZlbnQgPSByZW1vdmVFdmVudEVhc3k7XG5cbmlmICghd2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgYWRkRXZlbnQgPSBhZGRFdmVudEhhcmQ7XG59XG5cbmlmICghd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgcmVtb3ZlRXZlbnQgPSByZW1vdmVFdmVudEhhcmQ7XG59XG5cbmZ1bmN0aW9uIGFkZEV2ZW50RWFzeSAoZWxlbWVudCwgZXZ0LCBmbiwgY2FwdHVyZSkge1xuICByZXR1cm4gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2dCwgZm4sIGNhcHR1cmUpO1xufVxuXG5mdW5jdGlvbiBhZGRFdmVudEhhcmQgKGVsZW1lbnQsIGV2dCwgZm4sIGNhcHR1cmUpIHtcbiAgcmV0dXJuIGVsZW1lbnQuYXR0YWNoRXZlbnQoJ29uJyArIGV2dCwgZnVuY3Rpb24gKGFlKSB7XG4gICAgdmFyIGUgPSBhZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgZS50YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCAgPSBlLnByZXZlbnREZWZhdWx0IHx8IGZ1bmN0aW9uIHByZXZlbnREZWZhdWx0ICgpIHsgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlOyB9O1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uID0gZS5zdG9wUHJvcGFnYXRpb24gfHwgZnVuY3Rpb24gc3RvcFByb3BhZ2F0aW9uICgpIHsgZS5jYW5jZWxCdWJibGUgPSB0cnVlOyB9O1xuICAgIGZuLmNhbGwoZWxlbWVudCwgZSk7XG4gIH0sIGNhcHR1cmUpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudEVhc3kgKGVsZW1lbnQsIGV2dCwgZm4pIHtcbiAgcmV0dXJuIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnQsIGZuKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRXZlbnRIYXJkIChlbGVtZW50LCBldnQsIGZuKSB7XG4gIHJldHVybiBlbGVtZW50LmRldGFjaEV2ZW50KCdvbicgKyBldnQsIGZuKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFkZDogYWRkRXZlbnQsXG4gIHJlbW92ZTogcmVtb3ZlRXZlbnRcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBwb3NpdGlvbihtb2RhbCkge1xuXHR2YXIgY29udGFpbmVyID0gbW9kYWwucXVlcnlTZWxlY3RvcignI2Zyb3ctY29udGFpbmVyJyk7XG5cblx0dmFyIGxlZnQgPSBNYXRoLm1heCh3aW5kb3cuaW5uZXJXaWR0aCAtIGNvbnRhaW5lci5vZmZzZXRXaWR0aCwgMCkgLyAyO1xuXHR2YXIgdG9wID0gTWF0aC5tYXgod2luZG93LmlubmVySGVpZ2h0IC0gY29udGFpbmVyLm9mZnNldEhlaWdodCwgMCkgLyAyO1xuXG5cdGNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gU3RyaW5nKGxlZnQgKyB3aW5kb3cucGFnZVhPZmZzZXQpICsgJ3B4Jztcblx0Y29udGFpbmVyLnN0eWxlLnRvcCA9IFN0cmluZyh0b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQpICsgJ3B4JztcblxuXHR3aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbigpIHtcblx0XHRwb3NpdGlvbihtb2RhbCk7XG5cdH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcG9zaXRpb247IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXZlbnRzID0gcmVxdWlyZSgnLi9ldmVudHMnKTtcbnZhciBkaXNwb3NlID0gcmVxdWlyZSgnLi9kaXNwb3NlJyk7XG5cbmZ1bmN0aW9uIHJlbmRlciAoKSB7XG5cdHZhciBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuXHR2YXIgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHR2YXIgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHR2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdHZhciBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdHZhciBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHR2YXIgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdHZhciB0aGVCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdHZhciBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0dmFyIG9rQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdHZhciBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHR3cmFwcGVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnZnJvdy13cmFwcGVyJyk7XG5cdG92ZXJsYXkuc2V0QXR0cmlidXRlKCdpZCcsICdmcm93LW92ZXJsYXknKTtcblx0Y29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnZnJvdy1jb250YWluZXInKTtcblx0Y29udGVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Zyb3ctY29udGVudCcpO1xuXHRjbG9zZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Zyb3ctY2xvc2UnKTtcblx0Y2xvc2VCdXR0b24uc2V0QXR0cmlidXRlKCdocmVmJywgJyMnKTtcblx0aGVhZGVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnZnJvdy1oZWFkZXInKTtcblx0dGhlQm9keS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Zyb3ctYm9keScpO1xuXHRmb290ZXIuc2V0QXR0cmlidXRlKCdpZCcsICdmcm93LWZvb3RlcicpO1xuXHRva0J0bi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Zyb3ctb2stYnRuJyk7XG5cdGNhbmNlbEJ0bi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Zyb3ctY2FuY2VsLWJ0bicpO1xuXG5cdHdyYXBwZXIuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XG5cdHdyYXBwZXIuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuXHRjb250ZW50LmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uKTtcblx0Y29udGVudC5hcHBlbmRDaGlsZChoZWFkZXIpO1xuXHRjb250ZW50LmFwcGVuZENoaWxkKHRoZUJvZHkpO1xuXHRjb250ZW50LmFwcGVuZENoaWxkKGZvb3Rlcik7XG5cdGZvb3Rlci5hcHBlbmRDaGlsZChva0J0bik7XG5cdGZvb3Rlci5hcHBlbmRDaGlsZChjYW5jZWxCdG4pO1xuXHRib2R5LmFwcGVuZENoaWxkKHdyYXBwZXIpO1xuXG5cdHRoZUJvZHkuaW5uZXJIVE1MID0gJzxkaXY+SGVsbG8gV29ybGQhPC9kaXY+JztcblxuXHRldmVudHMuYWRkKGNsb3NlQnV0dG9uLCAnY2xpY2snLCBkaXNwb3NlKTtcblx0ZXZlbnRzLmFkZChjYW5jZWxCdG4sICdjbGljaycsIGRpc3Bvc2UpO1xuXHRldmVudHMuYWRkKG92ZXJsYXksICdjbGljaycsIGRpc3Bvc2UpO1xuXG5cdHNob3cod3JhcHBlcik7XG5cdHJldHVybiB3cmFwcGVyO1xufVxuXG5mdW5jdGlvbiBzaG93KG1vZGFsKSB7XG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0bW9kYWwuc3R5bGUub3BhY2l0eSA9IDE7XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG5cdH0sIDEwKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZW5kZXI7XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbG9hZEZyb20gPSByZXF1aXJlKCcuL2NvbnRlbnQnKTtcbnZhciBldmVudHMgPSByZXF1aXJlKCcuL2V2ZW50cycpO1xuXG5mdW5jdGlvbiBzZXR1cCAobW9kYWwsIG9wdGlvbnMpIHtcblx0bW9kYWwucXVlcnlTZWxlY3RvcignI2Zyb3ctaGVhZGVyJykuaW5uZXJIVE1MID0gb3B0aW9ucy50aXRsZTtcblx0bW9kYWwucXVlcnlTZWxlY3RvcignI2Zyb3ctY2FuY2VsLWJ0bicpLmlubmVySFRNTCA9IG9wdGlvbnMuY2FuY2VsQnRuVGV4dDtcblx0bW9kYWwucXVlcnlTZWxlY3RvcignI2Zyb3ctb2stYnRuJykuaW5uZXJIVE1MID0gb3B0aW9ucy5jb25maXJtQnRuVGV4dDtcblx0bW9kYWwucXVlcnlTZWxlY3RvcignI2Zyb3ctb3ZlcmxheScpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IG9wdGlvbnMub3ZlcmxheUNvbG9yO1xuXHRtb2RhbC5xdWVyeVNlbGVjdG9yKCcjZnJvdy1vdmVybGF5Jykuc3R5bGUub3BhY2l0eSA9IG9wdGlvbnMub3ZlcmxheU9wYWNpdHk7XG5cdG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJyNmcm93LWJvZHknKS5pbm5lckhUTUwgPSBsb2FkRnJvbS5sb2NhbChvcHRpb25zLmNvbnRlbnQpO1xuXHRpZiAob3B0aW9ucy53aWR0aCA9PT0gJ2F1dG8nKSB7XG5cdFx0bW9kYWwucXVlcnlTZWxlY3RvcignI2Zyb3ctY29udGFpbmVyJykuc3R5bGUubWF4V2lkdGggPSAnbm9uZSc7XG5cdFx0bW9kYWwucXVlcnlTZWxlY3RvcignI2Zyb3ctY29udGFpbmVyJykuc3R5bGUud2lkdGggPSAnaW5oZXJpdCc7XG5cdH1lbHNle1xuXHRcdG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJyNmcm93LWNvbnRhaW5lcicpLnN0eWxlLm1heFdpZHRoID0gb3B0aW9ucy53aWR0aDtcblx0fVxuXHRtb2RhbC5xdWVyeVNlbGVjdG9yKCcjZnJvdy1ib2R5Jykuc3R5bGUuaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQ7XG5cdGV2ZW50cy5hZGQobW9kYWwucXVlcnlTZWxlY3RvcignI2Zyb3ctb2stYnRuJyksICdjbGljaycsIG9wdGlvbnMuY29uZmlybUNhbGxiYWNrKTtcblxuXHRyZXR1cm4gbW9kYWw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0dXA7Il19
