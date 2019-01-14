/* eslint-env node */

var _Promisify = require('./Promisify');
var _Callbackify = require('./Callbackify');
var _Logging = require('callback-patterns/Logging');

/**
* A logging utility.
* It passes the arguments received into all the statements, collects the results, and joins them together with newlines to build the final log statement
* @param {...function} statements - any number of logging values.  Functions are called with the calling arguments, everything else is passed directly to
* @returns {taskFunction} a logging task
* @memberof callback-patterns
*/
function Logging(_1) {
	return _Promisify(_Logging.apply(this, arguments));
}

Logging.default = Logging;

module.exports = Logging;
