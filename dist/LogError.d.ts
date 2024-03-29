import Task from './types/Task';
import PromiseResult from './types/PromiseResult';
import Accepts from './types/Accepts';
import Returns from './types/Returns';
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
declare const LogError: <T extends Task>(task?: T | undefined) => (...args: Accepts<T, any>) => Promise<PromiseResult<Returns<T, any>>>;
export = LogError;
