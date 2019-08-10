
import AsyncTask from './types/AsyncTask';
import SyncTask from './types/SyncTask';
import CallbackTask from './types/CallbackTask';

import _Promisify from './Promisify';
import _Callbackify from './Callbackify';
import PassThrough from './PassThrough';

import _Timer from 'callback-patterns/Timer';

// quick hack to fix a bad type declaration from callback-patterns/Timer
const _Timer2 = _Timer as (CallbackTask, string) => CallbackTask;

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
function Timer(_1 ?: AsyncTask | SyncTask, _2 ?: string) : AsyncTask {
	var task = _Callbackify(_1 || EMPTY_TASK);
	var label = _2;

	return _Promisify(
		_Timer2(task, label)
	);
}

export = Timer;
