"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Promisify_1 = __importDefault(require("./Promisify"));
var Callbackify_1 = __importDefault(require("./Callbackify"));
var PassThrough_1 = __importDefault(require("./PassThrough"));
var TimeIn_1 = __importDefault(require("callback-patterns/TimeIn"));
/**
*
* ```javascript
*
*   let TimeIn = require('async-patterns/TimeIn');
*
*   let task = TimeIn(
*     async function (...args) {},
*			1000
*   );
*
*   await task(...args);
*
* ```
*
* TimeIn wraps a single task function, and returns a function that only returns after X ms.
*
* @param {taskFunction} task - the task to wrap in a timeout.
* @param {number} ms - the timein in ms.
* @returns {taskFunction} a task
* @memberof async-patterns
*/
function TimeIn(_1, _2) {
    var task = Callbackify_1.default(_1 || PassThrough_1.default);
    var ms = _2 || 1000;
    return Promisify_1.default(TimeIn_1.default(task, ms));
}
module.exports = TimeIn;
