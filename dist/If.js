"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var If_1 = __importDefault(require("callback-patterns/If"));
var Promisify_1 = __importDefault(require("./Promisify"));
var Callbackify_1 = __importDefault(require("./Callbackify"));
var PassThrough_1 = __importDefault(require("./PassThrough"));
/**
* ```javascript
*   let If = require('async-patterns/If');
*
*   let logIfEven = If(
*     (num) => (num % 2 === 0),
*     (num) => { console.log('is even!'); },
*     (num) => { console.log('is not even!'); }
*   );
*
*   await logIfEven(1); // prints out 'is not even!' eventually
*   await logIfEven(2); // prints out 'is even!' eventually
*
* ```
* If accepts up to three tasks,
* an 'if' task, a 'then' task, and lastly an 'else' task
* note: by default, the ifTask, thenTask, and elseTask are PassThrough
* note: the ifTask can return multiple results,
* but only the first is checked for truthiness
* @param {taskFunction} ifTask - a condition task.
* @param {taskFunction} thenTask - a task to run when ifTask returns a truthy value.
* @param {taskFunction} elseTask - a task to run when ifTask returns a falsy value.
* @returns {taskFunction}
* @memberof async-patterns
*/
function If(_1, _2, _3) {
    var conditionTask = Callbackify_1.default(_1 != null ? _1 : PassThrough_1.default);
    var thenTask = Callbackify_1.default(_2 != null ? _2 : PassThrough_1.default);
    var elseTask = Callbackify_1.default(_3 != null ? _3 : PassThrough_1.default);
    return Promisify_1.default(If_1.default(conditionTask, thenTask, elseTask));
}
module.exports = If;
