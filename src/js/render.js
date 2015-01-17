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























