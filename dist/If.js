/* eslint-env node */

var _If = require('callback-patterns/If');

var Promisify = require('./Promisify');
var Callbackify = require('./Callbackify');
var PassThrough = require('./PassThrough');

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
	var conditionTask = Callbackify(_1 != null ? _1 : PassThrough);
	var thenTask = Callbackify(_2 != null ? _2 : PassThrough);
	var elseTask = Callbackify(_3 != null ? _3 : PassThrough);

	return Promisify(_If(conditionTask, thenTask, elseTask));
}


If.default = If;

module.exports = If;
