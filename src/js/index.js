'use strict';

var index = [];
var key = 'data-frontrow-id';

function find(el) {
	if (el && el.getAttribute) {
		return index[el.getAttribute(key) - 1];
	}
}

function add(el, instance) {
	var id = index.push(instance);
	el.setAttribute(key, id);
	return id;
}

module.exports = {
	find: find,
	add: add
};