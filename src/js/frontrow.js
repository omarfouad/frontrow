'use strict';

var core = require('./core');
var defaults = require('./defaults');

function frontrow(elem, options) {
	var ops = options ? defaults(options) : defaults({});
	core.find(elem, ops);
}

module.exports = frontrow;