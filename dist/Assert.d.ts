import { PassThroughTask } from './PassThrough.types';
/**
*
* ```javascript
*   let Assert = require('async-patterns/Assert');
*   let InSeries = require('async-patterns/InSeries');
*
*   let task = InSeries(
*     (num) => num,
*     Assert(
*       (num) => (num >= 0),
*       (num) => `${num} is less than zero`
*     ),
*     (num) => num,
*   );
*
*   await task(1); // returns 1
*
*   await task(-1); // throws error
*
* ```
* Builds an async assertion task.
* @param {function} validator - a function that checks the arguments.
* @param {string} message - an optional error message to throw if the assertion fails, or a message builder function.
* @returns {taskFunction} an assertion task
* @memberof async-patterns
*/
declare function Assert(validator: any, message?: any): PassThroughTask;
export = Assert;
