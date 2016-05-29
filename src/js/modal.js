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
