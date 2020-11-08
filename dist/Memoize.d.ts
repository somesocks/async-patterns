import { Task, Accepts, Returns, PromiseResult } from './types';
declare type KeyFunction = (...args: any[]) => string;
declare type _MemoizeCache = {
    has: (key: string) => boolean;
    get: (key: string) => any;
    set: (key: string, val: any) => void;
    del: (key: string) => void;
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
declare function Memoize<T extends Task>(_1?: Task, _2?: KeyFunction, _3?: _MemoizeCache): (...args: Accepts<T>) => Promise<PromiseResult<Returns<T>>>;
declare namespace Memoize {
    var ObjectCache: (this: any) => void;
    var LRUCache: (this: any, size: number, ttl?: number | undefined) => void;
}
export = Memoize;
