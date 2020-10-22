import { Task } from './types';
declare type _UWP<T> = T extends Promise<infer U> ? U : T;
declare type _RET<T> = T extends (...args: any) => any ? ReturnType<T> : any;
declare type _ACC<T> = T extends (...args: any) => any ? Parameters<T> : any;
/**
* ```javascript
*   let task = LogError(task);
*
*   // if an error occurs, it will be logged before getting re-thrown here
*   const result = await task(request);
* ```
*
* @name LogError
* @param {function} task - an async function to wrap around with a error logging wrapper.
* @returns {function} an async wrapper function around the task
* @memberof async-patterns
*/
declare const LogError: <T extends Task>(task?: T | undefined) => (...args: _ACC<T>) => Promise<_UWP<_RET<T>>>;
export = LogError;
