
import Task from './types/Task';
import PromiseResult from './types/PromiseResult';
import Accepts from './types/Accepts';
import Returns from './types/Returns';

import AsyncTask from './types/AsyncTask';
import SyncTask from './types/SyncTask';
import CallbackTask from './types/CallbackTask';

import _Promisify from './Promisify';
import _Callbackify from './Callbackify';
import PassThrough from './PassThrough';

import _TimeOut from 'callback-patterns/TimeOut';
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
function TimeOut<T extends Task>(_1 ?: Task, _2 ?: number) : (...args : Accepts<T>) => Promise<PromiseResult<Returns<T>>> {
	var task = _Callbackify(_1 || PassThrough);
	var ms = _2 || 1000;

	return _Promisify(
		_TimeOut(task, ms)
	);
}

export = TimeOut;
