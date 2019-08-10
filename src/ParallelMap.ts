
import AsyncTask from './types/AsyncTask';
import SyncTask from './types/SyncTask';

import PassThrough from './PassThrough';

import InSeries from './InSeries';
import InParallel from './InParallel';

import Assert from './Assert';

/**
* ```javascript
	const task = ParallelMap(
		async (val, i) => val + 1
	);

	const results = await task([0, 1, 2]); // results is [1, 2, 3]
* ```
*
* @name ParallelMap
* @param {function} task - the mapping task
* @returns {function} an async wrapper function that takes in an array of requests, runs the task in parallel, once for each input in the array, and returns an array of results
* @memberof async-patterns
*/
const ParallelMap = function (task ?: AsyncTask | SyncTask) : AsyncTask {
	const task2 = task || PassThrough;

	const wrapper = InSeries(
		(val) => val || [],
		Assert((val) => Array.isArray(val)),
		async (request) => {
			const tasks = request.map((val, i) => task2(val, i));
			const results = await Promise.all(tasks);
			return results;
		},
		Assert((val) => Array.isArray(val))
	);

	return wrapper;
};

export = ParallelMap;
