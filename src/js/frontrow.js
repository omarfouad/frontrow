'use strict';

var core = require('./core');
var dispose = require('./dispose');

core.dispose = dispose;

module.exports = core;