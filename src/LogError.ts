
import AsyncTask from './types/AsyncTask';
import SyncTask from './types/SyncTask';

import PassThrough from './PassThrough';

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
const LogError = function LogError(task ?: AsyncTask | SyncTask) : AsyncTask {
	const task2 = task || PassThrough;

	return async function (request) {
		try {
			return await task2(request);
		} catch (err) {
			console.log('LogError', err);
			throw err;
		}
	};

};

export = LogError;
