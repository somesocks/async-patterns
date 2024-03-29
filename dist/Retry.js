"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Promisify_1 = __importDefault(require("./Promisify"));
var Callbackify_1 = __importDefault(require("./Callbackify"));
var Retry_1 = __importDefault(require("callback-patterns/Retry"));
var EMPTY_TASK = (0, Promisify_1.default)(function (next) { next(); });
/**
* Wraps a task and attempts to retry if it throws an error, with an exponential backoff.
* @param {taskFunction} task - the task to wrap.
* @param {object} options - an optional set of retry options.
* @param {object} options.timeout - maximum time to attempt retries.
* @param {object} options.retries - maximum number of retries to attempt.
* @returns {taskFunction} a task
* @memberof async-patterns
*/
function Retry(task, options) {
    task = (0, Callbackify_1.default)(task || EMPTY_TASK);
    return (0, Promisify_1.default)((0, Retry_1.default)(task, options));
}
module.exports = Retry;
