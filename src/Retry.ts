
import AsyncTask from './types/AsyncTask';
import SyncTask from './types/SyncTask';
import { Task } from './types';


import _Promisify from './Promisify';
import _Callbackify from './Callbackify';
import _Retry from 'callback-patterns/Retry';



type _UWP<T> = T extends Promise<infer U> ? U : T;

// type _Returns<T> = T extends (...args : any) => any ? ReturnType<T> : never;
type _RET<T> = T extends (...args : any) => any ? ReturnType<T> : any;
type _ACC<T> = T extends (...args : any) => any ? Parameters<T> : any;




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
function Retry<T extends Task>(task ?: T, options ?: any) : (...args : _ACC<T>) => Promise<_UWP<_RET<T>>>  {
	return _Promisify(
		_Retry(_Callbackify(task || EMPTY_TASK), options)
	);
}

export = Retry;
