
import { Task, Accepts, Returns, PromiseResult } from './types';

import AsyncTask from './types/AsyncTask';
import SyncTask from './types/SyncTask';
import CallbackTask from './types/CallbackTask';

import _Promisify from './Promisify';
import _Callbackify from './Callbackify';
import PassThrough from './PassThrough';

import _TimeIn from 'callback-patterns/TimeIn';

/**
*
* ```javascript
*
*   let TimeIn = require('async-patterns/TimeIn');
*
*   let task = TimeIn(
*     async function (...args) {},
*			1000
*   );
*
*   await task(...args);
*
* ```
*
* TimeIn wraps a single task function, and returns a function that only returns after X ms.
*
* @param {taskFunction} task - the task to wrap in a timeout.
* @param {number} ms - the timein in ms.
* @returns {taskFunction} a task
* @memberof async-patterns
*/
function TimeIn<T extends Task>(_1 ?: Task, _2 ?: number) : (...args : Accepts<T>) => Promise<PromiseResult<Returns<T>>> {
	var task = _Callbackify(_1 || PassThrough);
	var ms = _2 || 1000;

	return _Promisify(
		_TimeIn(task, ms)
	);
}

export = TimeIn;
