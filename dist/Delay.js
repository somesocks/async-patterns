"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Promisify_1 = __importDefault(require("./Promisify"));
var Delay_1 = __importDefault(require("callback-patterns/Delay"));
var DEFAULT_DELAY = 1000;
/**
*
* ```javascript
*   let Delay = require('async-patterns/Delay');
*   let InSeries = require('async-patterns/InSeries');
*
*   let task = InSeries(
*     (num) => num + 1
*     Delay(100),
*   );
*
*   await task(1); // returns 2, after a 100ms delay
*
* ```
* Delay acts like PassThrough, but inserts a delay in the call.
* @param {number} delay - The time to delay, in ms.
* @returns {taskFunction} a delay task
* @memberof async-patterns
*/
function Delay(_1) {
    return Promisify_1.default(Delay_1.default(_1 || DEFAULT_DELAY));
}
module.exports = Delay;
