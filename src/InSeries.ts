
import { SeriesTask, SeriesChain, SeriesArgs, SeriesResult } from './InSeries.types';

import PassThrough from './PassThrough';

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
const InSeries = function <T extends SeriesTask[]>(...tasks : SeriesChain<T>) : (...args : SeriesArgs<T>) => Promise<SeriesResult<T>> {
	tasks = tasks || [];

	if (tasks.length === 0) { return PassThrough as any; }

	return async function (request) {
		let index = 0;

		while (index < tasks.length) {
			request = await tasks[index](request);
			index++;
		}

		return request;
	} as any;

};

export = InSeries;
