
import PassThrough from './PassThrough';

import { ParallelTask, ParallelArgs, ParallelResult, ParallelChain } from './InParallel.types';

/**
* ```javascript
*
* let InParallel = require('async-patterns/InParallel');
*
*	const task = InParallel(
*		async (i) => i + 1,
*		async (i) => i + 2,
*		async (i) => i + 3
*	);
*
*	const results = await task(0); // results is [1, 2, 3]
*
* ```
*
* @name InParallel
* @param {...function} tasks - any number of async tasks.
* @returns {function} an async wrapper function that runs all the tasks in parallel, and returns an array of results
* @memberof async-patterns
*/
const InParallel = function <T extends ParallelTask[]>(...args : ParallelChain<T>) : (...args : ParallelArgs<T>) => Promise<ParallelResult<T>> {
	args = args || [];

	if (args.length === 0) { return PassThrough; }

	return async function (request) {
		const results = await Promise.all(args.map(task => task(request)));
		return results as any;
	};

};

export = InParallel;
