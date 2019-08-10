
import AsyncTask from './types/AsyncTask';
import SyncTask from './types/SyncTask';
import CallbackTask from './types/CallbackTask';

import _Promisify from './Promisify';
import _Callbackify from './Callbackify';
import PassThrough from './PassThrough';

import _Throttle from 'callback-patterns/Throttle';


/**
* Wraps a task and ensures that only X number of instances of the task can be run in parallel.
* Requests are queued up in an unbounded FIFO queue until they can be run.
* @param {taskFunction} task - the task to throttle
* @param {number} limit - the number of instances that can run in parallel. default 1.
* @returns {taskFunction} a task
* @memberof async-patterns
*/
function Throttle(_1 ?: AsyncTask | SyncTask, _2 ?: number) : AsyncTask {
	var task = _Callbackify(_1 || PassThrough);
	var limit = _2 || 1;

	return _Promisify(
		_Throttle(task, limit)
	);
}

export = Throttle;
