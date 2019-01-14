
const PassThrough = require('./PassThrough');

const InSeries = require('./InSeries');
const InParallel = require('./InParallel');

const Assert = require('./Assert');

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
* @memberof aah
*/
const ParallelFilter = function (task) {
	task = task || PassThrough;

	const wrapper = InSeries(
		(val) => val || [],
		Assert((val) => Array.isArray(val)),
		async (request) => {
			const tasks = request.map((val, i) => task(val, i));
			const allow = await Promise.all(tasks);

			const results = [];
			for (let i = 0; i < request.length; i++) {
				if (allow[i]) { results.push(request[i]); }
			}

			return results;
		},
		Assert((val) => Array.isArray(val))
	);

	return wrapper;
};

module.exports = ParallelFilter;
