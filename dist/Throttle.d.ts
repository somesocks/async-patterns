import { Task } from './types';
declare type _UWP<T> = T extends Promise<infer U> ? U : T;
declare type _RET<T> = T extends (...args: any) => any ? ReturnType<T> : any;
declare type _ACC<T> = T extends (...args: any) => any ? Parameters<T> : any;
/**
* Wraps a task and ensures that only X number of instances of the task can be run in parallel.
* Requests are queued up in an unbounded FIFO queue until they can be run.
* @param {taskFunction} task - the task to throttle
* @param {number} limit - the number of instances that can run in parallel. default 1.
* @returns {taskFunction} a task
* @memberof async-patterns
*/
declare function Throttle<T extends Task>(_1?: T, _2?: number): (...args: _ACC<T>) => Promise<_UWP<_RET<T>>>;
export = Throttle;
