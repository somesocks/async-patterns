import AsyncTask from './types/AsyncTask';
import SyncTask from './types/SyncTask';
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
declare const LogError: (task?: AsyncTask | SyncTask | undefined) => AsyncTask;
export = LogError;
