import { Task } from './types';
declare type _UWP<T> = T extends Promise<infer U> ? U : T;
declare type _RET<T> = T extends (...args: any) => any ? ReturnType<T> : any;
declare type _ACC<T> = T extends (...args: any) => any ? Parameters<T> : any;
/**
* Wraps a task and logs how long it takes to finish, or fail.
* @param {taskFunction} task - the task to wrap.
* @param {string} label - an optional label to log.
* @returns {taskFunction} a task
* @memberof async-patterns
*/
declare function Timer<T extends Task>(_1?: T, _2?: string): (...args: _ACC<T>) => Promise<_UWP<_RET<T>>>;
export = Timer;
