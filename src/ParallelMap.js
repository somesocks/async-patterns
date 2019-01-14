
const PassThrough = require('./PassThrough');

const InSeries = require('./InSeries');
const InParallel = require('./InParallel');

const Assert = require('./Assert');

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
* @memberof aah
*/
const ParallelMap = function (task) {
	task = task || PassThrough;

	const wrapper = InSeries(
		(val) => val || [],
		Assert((val) => Array.isArray(val)),
		async (request) => {
			const tasks = request.map((val, i) => task(val, i));
			const results = await Promise.all(tasks);
			return results;
		},
		Assert((val) => Array.isArray(val))
	);

	return wrapper;
};

module.exports = ParallelMap;
