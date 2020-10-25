
import { Task, Accepts, Returns, PromiseResult } from '../types';

import _Promisify from '../Promisify';
import _Callbackify from '../Callbackify';
import PassThrough from '../PassThrough';

import _TraceError from 'callback-patterns/unstable/TraceError';

/**
* TraceError is an experimental wrapper that attempts to make errors more informative.
* It does this by appending extra information to the stack of any error thrown in the task.
*
* NOTE: TraceError is marked as 'unstable' as stack traces in JS are not standardized,
* so it may not always provide useful information.
*
* @param {function} task - a task function to wrap
* @returns {function} a wrapper function that modifies the stack trace of any errors thrown within
* @memberof async-patterns.unstable
*/
function TraceError<T extends Task>(_1 ?: Task) : (...args : Accepts<T>) => Promise<PromiseResult<Returns<T>>> {
	return _Promisify(
		_TraceError(
			_Callbackify(_1)
		)
	);
}

export = TraceError;
