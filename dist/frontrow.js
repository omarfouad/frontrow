!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.frontrow=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var find = require('./find');
var defaults = require('./defaults');

function frontrow(elem, options) {
	var ops = options ? defaults(options) : defaults({});
	return find(elem, ops);
}

module.exports = frontrow;
},{"./defaults":3,"./find":5}],2:[function(require,module,exports){
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
		confirmCallback: options.confirmCallback || null
	};
	return ops;
}

module.exports = defaults;
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
'use strict';

var ev = require('./event');
var render = require('./render');
var setup = require('./setup');

function find(el, ops) {
	var modal = {};
	var element = document.querySelector('#' + el);
	modal.el = element;
	modal.options = ops;

	ev.click(element, draw.bind(modal));

	return modal;
}

function draw() {
	var modal = render();
	setup(modal, this.options);
}

module.exports = find;
},{"./event":4,"./render":6,"./setup":7}],6:[function(require,module,exports){
'use strict';

var ev = require('./event');

function render () {
	dispose();

	var body = document.querySelector('body');
	var wrapper = document.createElement('div');
	var overlay = document.createElement('div');
	var container = document.createElement('div');
	var content = document.createElement('div');
	var closeButton = document.createElement('a');
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

	theBody.innerHTML = '<div>No content yet. (But it works!)</div>';

	ev.click(closeButton, dispose);
	ev.click(cancelBtn, dispose);
	ev.click(overlay, dispose);

	body.style.overflow = 'hidden';

	return wrapper;
}

function dispose () {
	var el = document.querySelector('#frow-wrapper');
	if (el) { el.parentNode.removeChild(el); }
	document.querySelector('body').style.overflow = 'scroll';
}

module.exports = render;
},{"./event":4}],7:[function(require,module,exports){
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
},{"./content":2,"./event":4}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZnJvbnRyb3cuanMiLCJzcmMvanMvY29udGVudC5qcyIsInNyYy9qcy9kZWZhdWx0cy5qcyIsInNyYy9qcy9ldmVudC5qcyIsInNyYy9qcy9maW5kLmpzIiwic3JjL2pzL3JlbmRlci5qcyIsInNyYy9qcy9zZXR1cC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBmaW5kID0gcmVxdWlyZSgnLi9maW5kJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbmZ1bmN0aW9uIGZyb250cm93KGVsZW0sIG9wdGlvbnMpIHtcblx0dmFyIG9wcyA9IG9wdGlvbnMgPyBkZWZhdWx0cyhvcHRpb25zKSA6IGRlZmF1bHRzKHt9KTtcblx0cmV0dXJuIGZpbmQoZWxlbSwgb3BzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmcm9udHJvdzsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBsb2FkRnJvbSA9IHtcblx0bG9jYWw6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcblx0XHRyZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KS5pbm5lckhUTUw7XG5cdH1cblx0Ly8gVE9ETzogTG9hZCBjb250ZW50IGZyb20gcmVtb3RlIGZpbGVcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbG9hZEZyb207IiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBkZWZhdWx0cyhvcHRpb25zKSB7XG5cdHZhciBvcHMgPSB7XG5cdFx0dGl0bGU6IG9wdGlvbnMudGl0bGUgfHwgJ0Zyb250cm93IScsXG5cdFx0Y29uZmlybUJ0blRleHQ6IG9wdGlvbnMuY29uZmlybUJ0blRleHQgfHwgJ0NvbmZpcm0nLFxuXHRcdGNhbmNlbEJ0blRleHQ6IG9wdGlvbnMuY2FuY2VsQnRuVGV4dCB8fCAnY2FuY2VsJyxcblx0XHRvdmVybGF5Q29sb3I6IG9wdGlvbnMub3ZlcmxheUNvbG9yIHx8ICd3aGl0ZScsXG5cdFx0b3ZlcmxheU9wYWNpdHk6IG9wdGlvbnMub3ZlcmxheU9wYWNpdHkgfHwgMC44LFxuXHRcdGNvbnRlbnQ6IG9wdGlvbnMuY29udGVudCB8fCAnI2Zyb3ctYm9keScsXG5cdFx0d2lkdGg6IG9wdGlvbnMud2lkdGggfHwgJzMwMHB4Jyxcblx0XHRoZWlnaHQ6IG9wdGlvbnMuaGVpZ2h0IHx8IG51bGwsXG5cdFx0Y29uZmlybUNhbGxiYWNrOiBvcHRpb25zLmNvbmZpcm1DYWxsYmFjayB8fCBudWxsXG5cdH07XG5cdHJldHVybiBvcHM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXYgPSB7XG5cdGNsaWNrOiBmdW5jdGlvbihlbCwgY2IpIHtcblx0XHRpZihlbC5hZGRFdmVudExpc3RlbmVyKSB7XG5cdFx0XHRlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkgeyBjYigpOyB9KTtcdFxuXHRcdH1lbHNlIGlmKGVsLmF0dGFjaEV2ZW50KSB7XG5cdFx0XHRlbC5hdHRhY2hFdmVudCgnY2xpY2snLCBmdW5jdGlvbigpIHsgY2IoKTsgfSk7XG5cdFx0fVxuXHR9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV2OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGV2ID0gcmVxdWlyZSgnLi9ldmVudCcpO1xudmFyIHJlbmRlciA9IHJlcXVpcmUoJy4vcmVuZGVyJyk7XG52YXIgc2V0dXAgPSByZXF1aXJlKCcuL3NldHVwJyk7XG5cbmZ1bmN0aW9uIGZpbmQoZWwsIG9wcykge1xuXHR2YXIgbW9kYWwgPSB7fTtcblx0dmFyIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIGVsKTtcblx0bW9kYWwuZWwgPSBlbGVtZW50O1xuXHRtb2RhbC5vcHRpb25zID0gb3BzO1xuXG5cdGV2LmNsaWNrKGVsZW1lbnQsIGRyYXcuYmluZChtb2RhbCkpO1xuXG5cdHJldHVybiBtb2RhbDtcbn1cblxuZnVuY3Rpb24gZHJhdygpIHtcblx0dmFyIG1vZGFsID0gcmVuZGVyKCk7XG5cdHNldHVwKG1vZGFsLCB0aGlzLm9wdGlvbnMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZpbmQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXYgPSByZXF1aXJlKCcuL2V2ZW50Jyk7XG5cbmZ1bmN0aW9uIHJlbmRlciAoKSB7XG5cdGRpc3Bvc2UoKTtcblxuXHR2YXIgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcblx0dmFyIHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0dmFyIG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0dmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHR2YXIgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHR2YXIgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cdHZhciBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0dmFyIHRoZUJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0dmFyIGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHR2YXIgb2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0dmFyIGNhbmNlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdHdyYXBwZXIuc2V0QXR0cmlidXRlKCdpZCcsICdmcm93LXdyYXBwZXInKTtcblx0b3ZlcmxheS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Zyb3ctb3ZlcmxheScpO1xuXHRjb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdmcm93LWNvbnRhaW5lcicpO1xuXHRjb250ZW50LnNldEF0dHJpYnV0ZSgnaWQnLCAnZnJvdy1jb250ZW50Jyk7XG5cdGNsb3NlQnV0dG9uLnNldEF0dHJpYnV0ZSgnaWQnLCAnZnJvdy1jbG9zZScpO1xuXHRjbG9zZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycpO1xuXHRoZWFkZXIuc2V0QXR0cmlidXRlKCdpZCcsICdmcm93LWhlYWRlcicpO1xuXHR0aGVCb2R5LnNldEF0dHJpYnV0ZSgnaWQnLCAnZnJvdy1ib2R5Jyk7XG5cdGZvb3Rlci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Zyb3ctZm9vdGVyJyk7XG5cdG9rQnRuLnNldEF0dHJpYnV0ZSgnaWQnLCAnZnJvdy1vay1idG4nKTtcblx0Y2FuY2VsQnRuLnNldEF0dHJpYnV0ZSgnaWQnLCAnZnJvdy1jYW5jZWwtYnRuJyk7XG5cblx0d3JhcHBlci5hcHBlbmRDaGlsZChvdmVybGF5KTtcblx0d3JhcHBlci5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoY29udGVudCk7XG5cdGNvbnRlbnQuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b24pO1xuXHRjb250ZW50LmFwcGVuZENoaWxkKGhlYWRlcik7XG5cdGNvbnRlbnQuYXBwZW5kQ2hpbGQodGhlQm9keSk7XG5cdGNvbnRlbnQuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcblx0Zm9vdGVyLmFwcGVuZENoaWxkKG9rQnRuKTtcblx0Zm9vdGVyLmFwcGVuZENoaWxkKGNhbmNlbEJ0bik7XG5cdGJvZHkuYXBwZW5kQ2hpbGQod3JhcHBlcik7XG5cblx0dGhlQm9keS5pbm5lckhUTUwgPSAnPGRpdj5ObyBjb250ZW50IHlldC4gKEJ1dCBpdCB3b3JrcyEpPC9kaXY+JztcblxuXHRldi5jbGljayhjbG9zZUJ1dHRvbiwgZGlzcG9zZSk7XG5cdGV2LmNsaWNrKGNhbmNlbEJ0biwgZGlzcG9zZSk7XG5cdGV2LmNsaWNrKG92ZXJsYXksIGRpc3Bvc2UpO1xuXG5cdGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcblxuXHRyZXR1cm4gd3JhcHBlcjtcbn1cblxuZnVuY3Rpb24gZGlzcG9zZSAoKSB7XG5cdHZhciBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmcm93LXdyYXBwZXInKTtcblx0aWYgKGVsKSB7IGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpOyB9XG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5zdHlsZS5vdmVyZmxvdyA9ICdzY3JvbGwnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlbmRlcjsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBsb2FkRnJvbSA9IHJlcXVpcmUoJy4vY29udGVudCcpO1xudmFyIGV2ID0gcmVxdWlyZSgnLi9ldmVudCcpO1xuXG5mdW5jdGlvbiBzZXR1cCAobW9kYWwsIG9wdGlvbnMpIHtcblx0bW9kYWwucXVlcnlTZWxlY3RvcignI2Zyb3ctaGVhZGVyJykuaW5uZXJIVE1MID0gb3B0aW9ucy50aXRsZTtcblx0bW9kYWwucXVlcnlTZWxlY3RvcignI2Zyb3ctY2FuY2VsLWJ0bicpLmlubmVySFRNTCA9IG9wdGlvbnMuY2FuY2VsQnRuVGV4dDtcblx0bW9kYWwucXVlcnlTZWxlY3RvcignI2Zyb3ctb2stYnRuJykuaW5uZXJIVE1MID0gb3B0aW9ucy5jb25maXJtQnRuVGV4dDtcblx0bW9kYWwucXVlcnlTZWxlY3RvcignI2Zyb3ctb3ZlcmxheScpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IG9wdGlvbnMub3ZlcmxheUNvbG9yO1xuXHRtb2RhbC5xdWVyeVNlbGVjdG9yKCcjZnJvdy1vdmVybGF5Jykuc3R5bGUub3BhY2l0eSA9IG9wdGlvbnMub3ZlcmxheU9wYWNpdHk7XG5cdG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJyNmcm93LWJvZHknKS5pbm5lckhUTUwgPSBsb2FkRnJvbS5sb2NhbChvcHRpb25zLmNvbnRlbnQpO1xuXHRtb2RhbC5xdWVyeVNlbGVjdG9yKCcjZnJvdy1jb250YWluZXInKS5zdHlsZS5tYXhXaWR0aCA9IG9wdGlvbnMud2lkdGg7XG5cdG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJyNmcm93LWJvZHknKS5zdHlsZS5oZWlnaHQgPSBvcHRpb25zLmhlaWdodDtcblx0ZXYuY2xpY2sobW9kYWwucXVlcnlTZWxlY3RvcignI2Zyb3ctb2stYnRuJyksIG9wdGlvbnMuY29uZmlybUNhbGxiYWNrKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXR1cDsiXX0=
