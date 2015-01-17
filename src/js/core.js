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