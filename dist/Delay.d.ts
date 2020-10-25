import { PassThroughTask } from './PassThrough.types';
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
declare function Delay(_1?: number): PassThroughTask;
export = Delay;
