
var _Promisify = require('./Promisify');
var _Callbackify = require('./Callbackify');
var _While = require('callback-patterns/While');

var PassThrough = require('./PassThrough');

var _false = _Promisify(
	function _false(next) { return next(null, false); }
);

/**
* ```javascript
*   let While = require('callback-patterns/While');
*
*   let task = While(
*     (next, num) => next(null, num < 10),
*     (next, num) => next(null, num + 1),
*   );
*
*   let onDone = (err, result) => console.log(result);
*
*   task(onDone, 1); // prints 9, eventually
* ```
* While accepts two tasks and returns a task that conditionally executes some number of times.
* @param {function} conditionTask - a condition task.
* @param {function} loopTask - a task to run if the condition returns a truthy value.
* @returns {function}
* @memberof callback-patterns
*/
function While(_1, _2) {
	var conditionTask = _Callbackify(_1 != null ? _1 : _false);
	var loopTask = _Callbackify(_2 != null ? _2 : PassThrough);

	return _Promisify(
		_While(conditionTask, loopTask)
	);
}


While.default = While;

module.exports = While;
