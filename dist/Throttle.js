"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Promisify_1 = __importDefault(require("./Promisify"));
var Callbackify_1 = __importDefault(require("./Callbackify"));
var PassThrough_1 = __importDefault(require("./PassThrough"));
var Throttle_1 = __importDefault(require("callback-patterns/Throttle"));
/**
* Wraps a task and ensures that only X number of instances of the task can be run in parallel.
* Requests are queued up in an unbounded FIFO queue until they can be run.
* @param {taskFunction} task - the task to throttle
* @param {number} limit - the number of instances that can run in parallel. default 1.
* @returns {taskFunction} a task
* @memberof async-patterns
*/
function Throttle(_1, _2) {
    var task = Callbackify_1.default(_1 || PassThrough_1.default);
    var limit = _2 || 1;
    return Promisify_1.default(Throttle_1.default(task, limit));
}
module.exports = Throttle;
