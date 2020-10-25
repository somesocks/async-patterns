import { Task, Accepts, Returns, PromiseResult } from './types';
declare type KeyFunction = (...args: any[]) => string;
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
declare function Memoize<T extends Task>(_1?: Task, _2?: KeyFunction): (...args: Accepts<T>) => Promise<PromiseResult<Returns<T>>>;
export = Memoize;
