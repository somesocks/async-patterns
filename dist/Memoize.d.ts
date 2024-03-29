import Task from './types/Task';
import PromiseResult from './types/PromiseResult';
import Accepts from './types/Accepts';
import Returns from './types/Returns';
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
declare function Memoize<T extends Task>(task?: Task, keyFunction?: KeyFunction, cache?: _MemoizeCache): (...args: Accepts<T>) => Promise<PromiseResult<Returns<T>>>;
declare namespace Memoize {
    var ObjectCache: (this: any) => {
        has: (key: string) => boolean;
        get: (key: string) => any;
        set: (key: string, val: any) => void;
        del: (key: string) => void;
    };
    var LRUCache: (this: any, size: number, ttl?: number | undefined) => {
        has: (key: string) => boolean;
        get: (key: string) => any;
        set: (key: string, val: any) => void;
        del: (key: string) => void;
    };
    var SWR: typeof SWRMemoize;
}
declare type TSWRMemoizeOptions = {
    keyFunction?: KeyFunction;
    staleCache?: _MemoizeCache;
    refreshCache?: _MemoizeCache;
};
declare function SWRMemoize<T extends Task>(task?: Task, options?: TSWRMemoizeOptions): (...args: Accepts<T>) => Promise<PromiseResult<Returns<T>>>;
declare namespace SWRMemoize {
    var ObjectCache: (this: any) => {
        has: (key: string) => boolean;
        get: (key: string) => any;
        set: (key: string, val: any) => void;
        del: (key: string) => void;
    };
    var LRUCache: (this: any, size: number, ttl?: number | undefined) => {
        has: (key: string) => boolean;
        get: (key: string) => any;
        set: (key: string, val: any) => void;
        del: (key: string) => void;
    };
}
export = Memoize;
