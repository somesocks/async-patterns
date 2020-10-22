
import { PassThroughTask } from './PassThrough.types';

/**
* ```javascript
	const task = PassThrough;

	const results = await task(0); // results is 0
* ```
*
* PassThrough does nothing, just passes the request through as the result
* @name PassThrough
* @memberof async-patterns
*/
const PassThrough : PassThroughTask = async function<T extends any>(request : T) : Promise<T> {
	return request;
} as PassThroughTask;

export = PassThrough;
