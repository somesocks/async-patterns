import { Task, Accepts, Returns, PromiseResult } from './types';
/**
*
* ```javascript
*
*   let TimeOut = require('async-patterns/TimeOut');
*
*   let task = TimeOut(
*     async function (...args) {},
*			1000
*   );
*
*   await task(...args);
*
* ```
*
* TimeOut wraps a single task function, and returns a function that returns early if the task fails to complete before the timeout triggers.
*
* NOTE: the timeout being triggered will not cancel the original task.
*
* @param {taskFunction} task - the task to wrap in a timeout.
* @param {number} ms - the timeout in ms.
* @returns {taskFunction} a task
* @memberof async-patterns
*/
declare function TimeOut<T extends Task>(_1?: Task, _2?: number): (...args: Accepts<T>) => Promise<PromiseResult<Returns<T>>>;
export = TimeOut;
