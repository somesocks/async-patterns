"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Promisify_1 = __importDefault(require("./Promisify"));
var Callbackify_1 = __importDefault(require("./Callbackify"));
var Memoize_1 = __importDefault(require("callback-patterns/Memoize"));
var DEFAULT_KEY_FUNCTION = function () {
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
function Memoize(task, keyFunction, cache) {
    return (0, Promisify_1.default)((0, Memoize_1.default)((0, Callbackify_1.default)(task), keyFunction || DEFAULT_KEY_FUNCTION, cache));
}
Memoize.ObjectCache = Memoize_1.default.ObjectCache;
Memoize.LRUCache = Memoize_1.default.LRUCache;
function SWRMemoize(task, options) {
    return (0, Promisify_1.default)(Memoize_1.default.SWR((0, Callbackify_1.default)(task), options));
}
SWRMemoize.ObjectCache = Memoize_1.default.ObjectCache;
SWRMemoize.LRUCache = Memoize_1.default.LRUCache;
Memoize.SWR = SWRMemoize;
module.exports = Memoize;
