/* eslint-env node */

var _Promisify = require('./Promisify');
var _Callbackify = require('./Callbackify');
var _Delay = require('callback-patterns/Delay');

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
	return _Promisify(_Delay(_1));
}

Delay.default = Delay;

module.exports = Delay;
