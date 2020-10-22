import { Task } from './types';
declare type _UWP<T> = T extends Promise<infer U> ? U : T;
declare type _RET<T> = T extends (...args: any) => any ? ReturnType<T> : any;
declare type _ACC<T> = T extends (...args: any) => any ? Parameters<T> : any;
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
declare function TimeOut<T extends Task>(_1?: Task, _2?: number): (...args: _ACC<T>) => Promise<_UWP<_RET<T>>>;
export = TimeOut;
