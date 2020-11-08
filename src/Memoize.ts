
import { Task, Accepts, Returns, PromiseResult } from './types';

import _Promisify from './Promisify';
import _Callbackify from './Callbackify';
import PassThrough from './PassThrough';

import _Memoize from 'callback-patterns/Memoize';

type KeyFunction = (...args : any[]) => string;

type _MemoizeCache = {
	has : (key : string) => boolean,
	get : (key : string) => any,
	set : (key : string, val : any) => void,
	del : (key : string) => void,
}
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
function Memoize<T extends Task>(_1 ?: Task, _2 ?: KeyFunction, _3 ?: _MemoizeCache) : (...args : Accepts<T>) => Promise<PromiseResult<Returns<T>>> {
	return _Promisify(
		_Memoize(
			_Callbackify(_1),
			_2 || DEFAULT_KEY_FUNCTION,
      _3
		)
	);
}

Memoize.ObjectCache = _Memoize.ObjectCache;

Memoize.LRUCache = _Memoize.LRUCache;

export = Memoize;
