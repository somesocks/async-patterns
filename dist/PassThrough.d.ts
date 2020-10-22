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
declare const PassThrough: PassThroughTask;
export = PassThrough;
