import AsyncTask from './types/AsyncTask';
import SyncTask from './types/SyncTask';
declare type Task = AsyncTask | SyncTask;
/**
* ```javascript
*
* let InSeries = require('async-patterns/InSeries');
*
*	const task = InSeries(
*		async (i) => i + 1,
*		async (i) => i + 1,
*		async (i) => i + 1
*	);
*
*	const results = await task(0); // results is 3
*
* ```
*
* @name InSeries
* @param {...function} tasks - any number of async tasks.
* @returns {function} an async wrapper function that runs all of the tasks in series, calling each one with the results of the previous one
* @memberof async-patterns
*/
declare const InSeries: (...tasks: Task[]) => AsyncTask;
export = InSeries;
