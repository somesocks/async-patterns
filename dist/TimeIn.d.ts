import { Task, Accepts, Returns, PromiseResult } from './types';
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
declare function TimeIn<T extends Task>(_1?: Task, _2?: number): (...args: Accepts<T>) => Promise<PromiseResult<Returns<T>>>;
export = TimeIn;
