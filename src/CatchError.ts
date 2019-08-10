
import AsyncTask from './types/AsyncTask';
import SyncTask from './types/SyncTask';

import PassThrough from './PassThrough';

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
const CatchError = function CatchError(task ?: AsyncTask | SyncTask) : AsyncTask {
	const task2 = task || PassThrough;

	return async function (request) {
		const val = {
			result: undefined,
			error: undefined,
		};

		try {
			val.result = await task2(request);
		} catch (e) {
			val.error = e;
		}

		return val;
	};

};

export = CatchError;
