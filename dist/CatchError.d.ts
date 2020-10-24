import { Task, PromiseResult, Accepts, Returns } from './types';
/**
* ```javascript
*   let task = CatchError(task);
*
*   const { error, result } = await task(request);
* ```
*
* @name CatchError
* @param {function} task - an async function to wrap around with a catch wrapper.
* @returns {function} an async wrapper function around the task
* @memberof async-patterns
*/
declare const CatchError: <T extends Task>(task: T) => (...args: Accepts<T, any>) => Promise<{
    result?: PromiseResult<Returns<T, any>> | undefined;
    error?: any;
}>;
export = CatchError;
