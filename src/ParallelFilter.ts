
import AsyncTask from './types/AsyncTask';
import SyncTask from './types/SyncTask';

import PassThrough from './PassThrough';

import InSeries from './InSeries';
import InParallel from './InParallel';

import Assert from './Assert';

/**
* ```javascript
	const task = ParallelFilter(
		async (val, i) => val % 2 === 0
	);

	const results = await task([0, 1, 2]); // results is [0, 2]
* ```
*
* @name ParallelFilter
* @param {function} task - the filtering task
* @returns {function} an async wrapper function that takes in an array of requests, runs the task in parallel, once for each input in the array, and returns an array of results
* @memberof async-patterns
*/
const ParallelFilter = function (task ?: AsyncTask | SyncTask) : AsyncTask {
	const task2 = task || PassThrough;

	const wrapper = InSeries(
		(val) => val || [],
		Assert((val) => Array.isArray(val)),
		async (request) => {
			const tasks = request.map((val, i) => task2(val, i));
			const allow = await Promise.all(tasks);

			const results : any[] = [];
			for (let i = 0; i < request.length; i++) {
				if (allow[i]) { results.push(request[i]); }
			}

			return results;
		},
		Assert((val) => Array.isArray(val))
	);

	return wrapper;
};

export = ParallelFilter;
