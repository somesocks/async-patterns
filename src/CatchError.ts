
import { Task } from './types';

import { PassThroughTask } from './PassThrough.types';

type _UWP<T> = T extends Promise<infer U> ? U : T;

// type _Returns<T> = T extends (...args : any) => any ? ReturnType<T> : never;
type _RET<T> = T extends (...args : any) => any ? ReturnType<T> : any;
type _ACC<T> = T extends (...args : any) => any ? Parameters<T> : any;

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
const CatchError = function CatchError<T extends Task>(task : T) : (...args : _ACC<T>) => Promise<({ result ?: _UWP<_RET<T>>, error ?: any })>  {
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
	} as any;

};

export = CatchError;
