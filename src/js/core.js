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