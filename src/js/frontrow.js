'use strict';

var find = require('./find');
var defaults = require('./defaults');

function frontrow(elem, options) {
	var ops = options ? defaults(options) : defaults({});
	return find(elem, ops);
}

module.exports = frontrow;