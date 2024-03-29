
import Task from './types/Task';

import { PassThroughTask } from './PassThrough.types';


const nop = () => false;

const errorWrapper = (log) => {
	const wrapper =
		(typeof log === 'function' ? log : null) ||
		(() => log);
	return wrapper;
};

/**
*
* ```javascript
*   let Assert = require('async-patterns/Assert');
*   let InSeries = require('async-patterns/InSeries');
*
*   let task = InSeries(
*     (num) => num,
*     Assert(
*       (num) => (num >= 0),
*       (num) => `${num} is less than zero`
*     ),
*     (num) => num,
*   );
*
*   await task(1); // returns 1
*
*   await task(-1); // throws error
*
* ```
* Builds an async assertion task.
* @param {function} validator - a function that checks the arguments.
* @param {string} message - an optional error message to throw if the assertion fails, or a message builder function.
* @returns {taskFunction} an assertion task
* @memberof async-patterns
*/
function Assert(validator, message ?: any) : PassThroughTask {
	validator = validator || nop;
	message = message || 'async-patterns/Assert failed';
	message = errorWrapper(message);

	return async function (request) {
		if(!validator(request)) {
			let err = message(request);
			err = err instanceof Error ? err : new Error(err);
			throw err;
		}
		return request;
	} as any;
}


export = Assert;
