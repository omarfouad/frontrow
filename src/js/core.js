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