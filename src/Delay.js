/* eslint-env node */

var _Promisify = require('./Promisify');
var _Callbackify = require('./Callbackify');
var _Delay = require('callback-patterns/Delay');

/**
*
* ```javascript
*   let Delay = require('callback-patterns/Delay');
*   let InSeries = require('callback-patterns/InSeries');
*
*   let task = InSeries(
*     (next, num) => next(null, num),
*     Delay(100),
*     (next, num) => next(null, num + 1),
*   );
*
*   let onDone = (err, result) => console.log(err, result);
*
*   task(onDone, 1); // prints null 1, after a 100 ms delay
* ```
* Delay acts like PassThrough, but inserts a delay in the call.
* @param {number} delay - The time to delay, in ms.
* @returns {taskFunction} a delay task
* @memberof callback-patterns
*/
function Delay(_1) {
	return _Promisify(_Delay(_1));
}

Delay.default = Delay;

module.exports = Delay;
