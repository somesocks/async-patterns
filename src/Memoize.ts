
import { Task } from './types';
import CallbackTask from './types/CallbackTask';

import _Promisify from './Promisify';
import _Callbackify from './Callbackify';
import PassThrough from './PassThrough';

import _Memoize from 'callback-patterns/Memoize';

type KeyFunction = (...args : any[]) => string;


type _UWP<T> = T extends Promise<infer U> ? U : T;

// type _Returns<T> = T extends (...args : any) => any ? ReturnType<T> : never;
type _RET<T> = T extends (...args : any) => any ? ReturnType<T> : any;
type _ACC<T> = T extends (...args : any) => any ? Parameters<T> : any;


const DEFAULT_KEY_FUNCTION : KeyFunction = function () {
	var args = Array.prototype.slice.call(arguments);
	return JSON.stringify(args);
};

/**
* Memoize builds a wrapper function that caches results of previous executions.
* As a result, repeated calls to Memoize may be much faster, if the request hits the cache.
*
* NOTE: As of now, there are no cache eviction mechanisms.
*   You should try to use Memoized functions in a 'disposable' way as a result
*
* NOTE: Memoize is not 'thread-safe' currently.  If two calls are made for the same object currently,
*   two calls to the wrapped function will be made
*
* NOTE: Memoize will cache errors as well as results.
*
* @param {AsyncTask} task - the task function to memoize.
* @param {function=} keyFunction - a function that synchronously generates a key for a request.
* @returns {AsyncTask}
* @memberof async-patterns
*/
function Memoize<T extends Task>(_1 ?: T, _2 ?: KeyFunction) : (...args : _ACC<T>) => Promise<_UWP<_RET<T>>> {
	return _Promisify(
		_Memoize(
			_Callbackify(_1),
			_2 || DEFAULT_KEY_FUNCTION,
		)
	);
}

export = Memoize;
