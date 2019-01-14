
var _Promisify = require('./Promisify');
var _Callbackify = require('./Callbackify');
var _Throttle = require('callback-patterns/Throttle');

var PassThrough = require('./PassThrough');

/**
* Wraps a task and ensures that only X number of instances of the task can be run in parallel.
* Requests are queued up in an unbounded FIFO queue until they can be run.
* @param {taskFunction} task - the task to throttle
* @param {number} limit - the number of instances that can run in parallel. default 1.
* @returns {taskFunction} a task
* @memberof async-patterns
*/
function Throttle(_1, _2) {
	var task = _Callbackify(_1 || PassThrough);
	var limit = _2 || 1;

	return _Promisify(
		_Throttle(task, limit)
	);
}

Throttle.default = Throttle;

module.exports = Throttle;
