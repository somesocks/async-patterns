
import AsyncTask from './types/AsyncTask';
import SyncTask from './types/SyncTask';
import CallbackTask from './types/CallbackTask';

import _Promisify from './Promisify';
import _Callbackify from './Callbackify';
import PassThrough from './PassThrough';

import _While from 'callback-patterns/While';

var _false = _Promisify(
	function _false(next) { return next(null, false); }
);

/**
* ```javascript
*
* let While = require('async-patterns/While');
*
* let task = While(
*   (num) => (num < 10),
*   (num) => num + 1
* );
*
* await task(1); // prints 10, eventually
*
* ```
* While accepts two tasks and returns a task that conditionally executes some number of times.
* @param {function} conditionTask - a condition task.
* @param {function} loopTask - a task to run if the condition returns a truthy value.
* @returns {function}
* @memberof async-patterns
*/
function While(_1 ?: AsyncTask | SyncTask, _2 ?: AsyncTask | SyncTask) : AsyncTask {
	var conditionTask = _Callbackify(_1 != null ? _1 : _false);
	var loopTask = _Callbackify(_2 != null ? _2 : PassThrough);

	return _Promisify(
		_While(conditionTask, loopTask)
	);
}

export = While;
