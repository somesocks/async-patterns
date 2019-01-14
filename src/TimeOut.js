/* eslin-env node */

var _Promisify = require('./Promisify');
var _Callbackify = require('./Callbackify');
var _TimeOut = require('callback-patterns/TimeOut');

var PassThrough = require('./PassThrough');

/**
*
* ```javascript
*
*   let TimeOut = require('async-patterns/TimeOut');
*
*   let task = TimeOut(
*     async function (...args) {},
*			1000
*   );
*
*   await task(...args);
*
* ```
*
* TimeOut wraps a single task function, and returns a function that returns early if the task fails to complete before the timeout triggers.
*
* NOTE: the timeout being triggered will not cancel the original task.
*
* @param {taskFunction} task - the task to wrap in a timeout.
* @param {number} ms - the timeout in ms.
* @returns {taskFunction} a task
* @memberof async-patterns
*/
function TimeOut(_1, _2) {
	var task = _Callbackify(_1 || PassThrough);
	var ms = _2 || 1000;

	return _Promisify(
		_TimeOut(task, ms)
	);
}

TimeOut.default = TimeOut;
module.exports = TimeOut;
