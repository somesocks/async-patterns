/* eslin-env node */

var _Promisify = require('./Promisify');
var _Callbackify = require('./Callbackify');
var _TimeIn = require('callback-patterns/TimeIn');

var PassThrough = require('./PassThrough');

/**
*
* ```javascript
*   let TimeIn = require('callback-patterns/TimeIn');
*
*   let task = TimeIn(
*     function(next, ...args) {},
*			1000
*   );
*
*   task(next, ...args);
* ```
*
* TimeIn wraps a single task function, and returns a function that only returns after X ms.
*
* @param {taskFunction} task - the task to wrap in a timeout.
* @param {number} ms - the timein in ms.
* @returns {taskFunction} a task
* @memberof callback-patterns
*/
function TimeIn(_1, _2) {
	var task = _Callbackify(_1 || PassThrough);
	var ms = _2 || 1000;

	return _Promisify(
		_TimeIn(task, ms)
	);
}

TimeIn.default = TimeIn;
module.exports = TimeIn;
