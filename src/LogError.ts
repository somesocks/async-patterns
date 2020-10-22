
import { Task } from './types';

import PassThrough from './PassThrough';

type _UWP<T> = T extends Promise<infer U> ? U : T;

// type _Returns<T> = T extends (...args : any) => any ? ReturnType<T> : never;
type _RET<T> = T extends (...args : any) => any ? ReturnType<T> : any;
type _ACC<T> = T extends (...args : any) => any ? Parameters<T> : any;


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
const LogError = function LogError<T extends Task>(task ?: T) : (...args : _ACC<T>) => Promise<_UWP<_RET<T>>> {
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
