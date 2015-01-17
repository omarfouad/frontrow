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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZnJvbnRyb3cuanMiLCJzcmMvanMvY29udGVudC5qcyIsInNyYy9qcy9jb3JlLmpzIiwic3JjL2pzL2RlZmF1bHRzLmpzIiwic3JjL2pzL2V2ZW50LmpzIiwic3JjL2pzL3Bvc2l0aW9uLmpzIiwic3JjL2pzL3JlbmRlci5qcyIsInNyYy9qcy9zZXR1cC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY29yZSA9IHJlcXVpcmUoJy4vY29yZScpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG5mdW5jdGlvbiBmcm9udHJvdyhlbGVtLCBvcHRpb25zKSB7XG5cdHZhciBvcHMgPSBvcHRpb25zID8gZGVmYXVsdHMob3B0aW9ucykgOiBkZWZhdWx0cyh7fSk7XG5cdGNvcmUuZmluZChlbGVtLCBvcHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZyb250cm93OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGxvYWRGcm9tID0ge1xuXHRsb2NhbDogZnVuY3Rpb24oZWxlbWVudCkge1xuXHRcdHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpLmlubmVySFRNTDtcblx0fVxuXHQvLyBUT0RPOiBMb2FkIGNvbnRlbnQgZnJvbSByZW1vdGUgZmlsZVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBsb2FkRnJvbTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBldiA9IHJlcXVpcmUoJy4vZXZlbnQnKTtcbnZhciByZW5kZXIgPSByZXF1aXJlKCcuL3JlbmRlcicpO1xudmFyIHNldHVwID0gcmVxdWlyZSgnLi9zZXR1cCcpO1xudmFyIHBvc2l0aW9uID0gcmVxdWlyZSgnLi9wb3NpdGlvbicpO1xuXG5mdW5jdGlvbiBmaW5kKGVsLCBvcHMpIHtcblx0dmFyIGVsZW1lbnQgPSB7fTtcblx0ZWxlbWVudC5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgZWwpO1xuXHRlbGVtZW50Lm9wdGlvbnMgPSBvcHM7XG5cblx0ZXYuY2xpY2soZWxlbWVudC5lbCwgaW5pdC5iaW5kKGVsZW1lbnQpKTtcbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcblx0dmFyIG1vZGFsID0gcmVuZGVyKCk7XG5cdHNldHVwKG1vZGFsLCB0aGlzLm9wdGlvbnMpO1xuXHRwb3NpdGlvbihtb2RhbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRmaW5kOiBmaW5kXG59OyIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gZGVmYXVsdHMob3B0aW9ucykge1xuXHR2YXIgb3BzID0ge1xuXHRcdHRpdGxlOiBvcHRpb25zLnRpdGxlIHx8ICdGcm9udHJvdyEnLFxuXHRcdGNvbmZpcm1CdG5UZXh0OiBvcHRpb25zLmNvbmZpcm1CdG5UZXh0IHx8ICdDb25maXJtJyxcblx0XHRjYW5jZWxCdG5UZXh0OiBvcHRpb25zLmNhbmNlbEJ0blRleHQgfHwgJ2NhbmNlbCcsXG5cdFx0b3ZlcmxheUNvbG9yOiBvcHRpb25zLm92ZXJsYXlDb2xvciB8fCAnd2hpdGUnLFxuXHRcdG92ZXJsYXlPcGFjaXR5OiBvcHRpb25zLm92ZXJsYXlPcGFjaXR5IHx8IDAuOCxcblx0XHRjb250ZW50OiBvcHRpb25zLmNvbnRlbnQgfHwgJyNmcm93LWJvZHknLFxuXHRcdHdpZHRoOiBvcHRpb25zLndpZHRoIHx8ICczMDBweCcsXG5cdFx0aGVpZ2h0OiBvcHRpb25zLmhlaWdodCB8fCBudWxsLFxuXHRcdGNvbmZpcm1DYWxsYmFjazogb3B0aW9ucy5jb25maXJtQ2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fVxuXHR9O1xuXHRyZXR1cm4gb3BzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGV2ID0ge1xuXHRjbGljazogZnVuY3Rpb24oZWwsIGNiKSB7XG5cdFx0aWYoZWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuXHRcdFx0ZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHsgY2IoKTsgfSk7XHRcblx0XHR9ZWxzZSBpZihlbC5hdHRhY2hFdmVudCkge1xuXHRcdFx0ZWwuYXR0YWNoRXZlbnQoJ2NsaWNrJywgZnVuY3Rpb24oKSB7IGNiKCk7IH0pO1xuXHRcdH1cblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBldjsiLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIHBvc2l0aW9uKG1vZGFsKSB7XG5cdHZhciBjb250YWluZXIgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcjZnJvdy1jb250YWluZXInKTtcblxuXHR2YXIgbGVmdCA9IE1hdGgubWF4KHdpbmRvdy5pbm5lcldpZHRoIC0gY29udGFpbmVyLm9mZnNldFdpZHRoLCAwKSAvIDI7XG5cdHZhciB0b3AgPSBNYXRoLm1heCh3aW5kb3cuaW5uZXJIZWlnaHQgLSBjb250YWluZXIub2Zmc2V0SGVpZ2h0LCAwKSAvIDI7XG5cblx0Y29udGFpbmVyLnN0eWxlLmxlZnQgPSBTdHJpbmcobGVmdCArIHdpbmRvdy5wYWdlWE9mZnNldCkgKyAncHgnO1xuXHRjb250YWluZXIuc3R5bGUudG9wID0gU3RyaW5nKHRvcCArIHdpbmRvdy5wYWdlWU9mZnNldCkgKyAncHgnO1xuXG5cdHdpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdHBvc2l0aW9uKG1vZGFsKTtcblx0fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwb3NpdGlvbjsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBldiA9IHJlcXVpcmUoJy4vZXZlbnQnKTtcblxuZnVuY3Rpb24gcmVuZGVyICgpIHtcblx0dmFyIGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5cdHZhciB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdHZhciBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0dmFyIGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0dmFyIGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdHZhciBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0dmFyIHRoZUJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0dmFyIGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHR2YXIgb2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0dmFyIGNhbmNlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdHdyYXBwZXIuc2V0QXR0cmlidXRlKCdpZCcsICdmcm93LXdyYXBwZXInKTtcblx0b3ZlcmxheS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Zyb3ctb3ZlcmxheScpO1xuXHRjb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdmcm93LWNvbnRhaW5lcicpO1xuXHRjb250ZW50LnNldEF0dHJpYnV0ZSgnaWQnLCAnZnJvdy1jb250ZW50Jyk7XG5cdGNsb3NlQnV0dG9uLnNldEF0dHJpYnV0ZSgnaWQnLCAnZnJvdy1jbG9zZScpO1xuXHRjbG9zZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycpO1xuXHRoZWFkZXIuc2V0QXR0cmlidXRlKCdpZCcsICdmcm93LWhlYWRlcicpO1xuXHR0aGVCb2R5LnNldEF0dHJpYnV0ZSgnaWQnLCAnZnJvdy1ib2R5Jyk7XG5cdGZvb3Rlci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Zyb3ctZm9vdGVyJyk7XG5cdG9rQnRuLnNldEF0dHJpYnV0ZSgnaWQnLCAnZnJvdy1vay1idG4nKTtcblx0Y2FuY2VsQnRuLnNldEF0dHJpYnV0ZSgnaWQnLCAnZnJvdy1jYW5jZWwtYnRuJyk7XG5cblx0d3JhcHBlci5hcHBlbmRDaGlsZChvdmVybGF5KTtcblx0d3JhcHBlci5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoY29udGVudCk7XG5cdGNvbnRlbnQuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b24pO1xuXHRjb250ZW50LmFwcGVuZENoaWxkKGhlYWRlcik7XG5cdGNvbnRlbnQuYXBwZW5kQ2hpbGQodGhlQm9keSk7XG5cdGNvbnRlbnQuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcblx0Zm9vdGVyLmFwcGVuZENoaWxkKG9rQnRuKTtcblx0Zm9vdGVyLmFwcGVuZENoaWxkKGNhbmNlbEJ0bik7XG5cdGJvZHkuYXBwZW5kQ2hpbGQod3JhcHBlcik7XG5cblx0dGhlQm9keS5pbm5lckhUTUwgPSAnPGRpdj5IZWxsbyBXb3JsZCE8L2Rpdj4nO1xuXG5cdGV2LmNsaWNrKGNsb3NlQnV0dG9uLCBkaXNwb3NlLmJpbmQod3JhcHBlcikpO1xuXHRldi5jbGljayhjYW5jZWxCdG4sIGRpc3Bvc2UuYmluZCh3cmFwcGVyKSk7XG5cdGV2LmNsaWNrKG92ZXJsYXksIGRpc3Bvc2UuYmluZCh3cmFwcGVyKSk7XG5cblx0c2hvdyh3cmFwcGVyKTtcblx0cmV0dXJuIHdyYXBwZXI7XG59XG5cbmZ1bmN0aW9uIHNob3cobW9kYWwpIHtcblx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRtb2RhbC5zdHlsZS5vcGFjaXR5ID0gMTtcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jykuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcblx0fSwgMTApO1xufVxuXG5mdW5jdGlvbiBkaXNwb3NlICgpIHtcblx0dmFyIG1vZGFsID0gdGhpcztcblx0bW9kYWwuc3R5bGUub3BhY2l0eSA9IDAuMDtcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLnN0eWxlLm92ZXJmbG93ID0gJ3Njcm9sbCc7XG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0bW9kYWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChtb2RhbCk7XG5cdH0sIDI1MCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVuZGVyO1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGxvYWRGcm9tID0gcmVxdWlyZSgnLi9jb250ZW50Jyk7XG5cbmZ1bmN0aW9uIHNldHVwIChtb2RhbCwgb3B0aW9ucykge1xuXHRtb2RhbC5xdWVyeVNlbGVjdG9yKCcjZnJvdy1oZWFkZXInKS5pbm5lckhUTUwgPSBvcHRpb25zLnRpdGxlO1xuXHRtb2RhbC5xdWVyeVNlbGVjdG9yKCcjZnJvdy1jYW5jZWwtYnRuJykuaW5uZXJIVE1MID0gb3B0aW9ucy5jYW5jZWxCdG5UZXh0O1xuXHRtb2RhbC5xdWVyeVNlbGVjdG9yKCcjZnJvdy1vay1idG4nKS5pbm5lckhUTUwgPSBvcHRpb25zLmNvbmZpcm1CdG5UZXh0O1xuXHRtb2RhbC5xdWVyeVNlbGVjdG9yKCcjZnJvdy1vdmVybGF5Jykuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gb3B0aW9ucy5vdmVybGF5Q29sb3I7XG5cdG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJyNmcm93LW92ZXJsYXknKS5zdHlsZS5vcGFjaXR5ID0gb3B0aW9ucy5vdmVybGF5T3BhY2l0eTtcblx0bW9kYWwucXVlcnlTZWxlY3RvcignI2Zyb3ctYm9keScpLmlubmVySFRNTCA9IGxvYWRGcm9tLmxvY2FsKG9wdGlvbnMuY29udGVudCk7XG5cdGlmIChvcHRpb25zLndpZHRoID09PSAnYXV0bycpIHtcblx0XHRtb2RhbC5xdWVyeVNlbGVjdG9yKCcjZnJvdy1jb250YWluZXInKS5zdHlsZS5tYXhXaWR0aCA9ICdub25lJztcblx0XHRtb2RhbC5xdWVyeVNlbGVjdG9yKCcjZnJvdy1jb250YWluZXInKS5zdHlsZS53aWR0aCA9ICdpbmhlcml0Jztcblx0fWVsc2V7XG5cdFx0bW9kYWwucXVlcnlTZWxlY3RvcignI2Zyb3ctY29udGFpbmVyJykuc3R5bGUubWF4V2lkdGggPSBvcHRpb25zLndpZHRoO1xuXHR9XG5cdG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJyNmcm93LWJvZHknKS5zdHlsZS5oZWlnaHQgPSBvcHRpb25zLmhlaWdodDtcblx0bW9kYWwuY2xpY2sobW9kYWwucXVlcnlTZWxlY3RvcignI2Zyb3ctb2stYnRuJyksIG9wdGlvbnMuY29uZmlybUNhbGxiYWNrKTtcblxuXHRyZXR1cm4gbW9kYWw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0dXA7Il19
