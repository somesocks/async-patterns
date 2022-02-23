"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Promisify_1 = __importDefault(require("../Promisify"));
var Callbackify_1 = __importDefault(require("../Callbackify"));
var TraceError_1 = __importDefault(require("callback-patterns/unstable/TraceError"));
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
function TraceError(_1) {
    return (0, Promisify_1.default)((0, TraceError_1.default)((0, Callbackify_1.default)(_1)));
}
module.exports = TraceError;
