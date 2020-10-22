import { Task } from './types';
declare type _UWP<T> = T extends Promise<infer U> ? U : T;
declare type _RET<T> = T extends (...args: any) => any ? ReturnType<T> : any;
declare type _ACC<T> = T extends (...args: any) => any ? Parameters<T> : any;
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
declare function TimeIn<T extends Task>(_1?: T, _2?: number): (...args: _ACC<T>) => Promise<_UWP<_RET<T>>>;
export = TimeIn;
