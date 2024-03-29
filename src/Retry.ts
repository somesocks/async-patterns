
import Task from './types/Task';
import PromiseResult from './types/PromiseResult';
import Accepts from './types/Accepts';
import Returns from './types/Returns';

import CallbackTask from './types/CallbackTask';


import _Promisify from './Promisify';
import _Callbackify from './Callbackify';
import _Retry from 'callback-patterns/Retry';

var EMPTY_TASK = _Promisify(
	function (next) { next(); }
);

/**
* Wraps a task and attempts to retry if it throws an error, with an exponential backoff.
* @param {taskFunction} task - the task to wrap.
* @param {object} options - an optional set of retry options.
* @param {object} options.timeout - maximum time to attempt retries.
* @param {object} options.retries - maximum number of retries to attempt.
* @returns {taskFunction} a task
* @memberof async-patterns
*/
function Retry<T extends Task>(task ?: Task, options ?: any) : (...args : Accepts<T>) => Promise<PromiseResult<Returns<T>>> {
	task = _Callbackify(task || EMPTY_TASK);

	return _Promisify(
		_Retry(task, options)
	);
}

export = Retry;
