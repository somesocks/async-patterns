/* eslint-env node */

var _Promisify = require('./Promisify');
var _Callbackify = require('./Callbackify');
var _Timer = require('callback-patterns/Timer');

var PassThrough = require('./PassThrough');

var EMPTY_TASK = _Promisify(
	function (next) { next(); }
);

/**
* Wraps a task and logs how long it takes to finish, or fail.
* @param {taskFunction} task - the task to wrap.
* @param {string} label - an optional label to log.
* @returns {taskFunction} a task
* @memberof async-patterns
*/
function Timer(_1, _2) {
	var task = _Callbackify(_1 || EMPTY_TASK);
	var label = _2;

	return _Promisify(
		_Timer(task, label)
	);
}

Timer.default = Timer;

module.exports = Timer;
