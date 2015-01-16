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