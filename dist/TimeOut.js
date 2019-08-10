"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Promisify_1 = __importDefault(require("./Promisify"));
var Callbackify_1 = __importDefault(require("./Callbackify"));
var PassThrough_1 = __importDefault(require("./PassThrough"));
var TimeOut_1 = __importDefault(require("callback-patterns/TimeOut"));
/**
*
* ```javascript
*
*   let TimeOut = require('async-patterns/TimeOut');
*
*   let task = TimeOut(
*     async function (...args) {},
*			1000
*   );
*
*   await task(...args);
*
* ```
*
* TimeOut wraps a single task function, and returns a function that returns early if the task fails to complete before the timeout triggers.
*
* NOTE: the timeout being triggered will not cancel the original task.
*
* @param {taskFunction} task - the task to wrap in a timeout.
* @param {number} ms - the timeout in ms.
* @returns {taskFunction} a task
* @memberof async-patterns
*/
function TimeOut(_1, _2) {
    var task = Callbackify_1.default(_1 || PassThrough_1.default);
    var ms = _2 || 1000;
    return Promisify_1.default(TimeOut_1.default(task, ms));
}
module.exports = TimeOut;
