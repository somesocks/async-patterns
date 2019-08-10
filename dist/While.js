"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Promisify_1 = __importDefault(require("./Promisify"));
var Callbackify_1 = __importDefault(require("./Callbackify"));
var PassThrough_1 = __importDefault(require("./PassThrough"));
var While_1 = __importDefault(require("callback-patterns/While"));
var _false = Promisify_1.default(function _false(next) { return next(null, false); });
/**
* ```javascript
*
* let While = require('async-patterns/While');
*
* let task = While(
*   (num) => (num < 10),
*   (num) => num + 1
* );
*
* await task(1); // prints 10, eventually
*
* ```
* While accepts two tasks and returns a task that conditionally executes some number of times.
* @param {function} conditionTask - a condition task.
* @param {function} loopTask - a task to run if the condition returns a truthy value.
* @returns {function}
* @memberof async-patterns
*/
function While(_1, _2) {
    var conditionTask = Callbackify_1.default(_1 != null ? _1 : _false);
    var loopTask = Callbackify_1.default(_2 != null ? _2 : PassThrough_1.default);
    return Promisify_1.default(While_1.default(conditionTask, loopTask));
}
module.exports = While;
