import AsyncTask from './types/AsyncTask';
import SyncTask from './types/SyncTask';
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
declare const CatchError: (task?: AsyncTask | SyncTask | undefined) => AsyncTask;
export = CatchError;
