import AsyncTask from './types/AsyncTask';
import SyncTask from './types/SyncTask';
/**
* ```javascript
*
* let While = require('async-patterns/While');
*
* let task = While(
*   (num) => (num < 10),
*   (num) => num + 1
* );
*
* await task(1); // prints 10, eventually
*
* ```
* While accepts two tasks and returns a task that conditionally executes some number of times.
* @param {function} conditionTask - a condition task.
* @param {function} loopTask - a task to run if the condition returns a truthy value.
* @returns {function}
* @memberof async-patterns
*/
declare function While(_1?: AsyncTask | SyncTask, _2?: AsyncTask | SyncTask): AsyncTask;
export = While;
