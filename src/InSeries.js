
const PassThrough = require('./PassThrough');

/**
* ```javascript
	const task = InSeries(
		async (i) => i + 1,
		async (i) => i + 1,
		async (i) => i + 1
	);

	const results = await task(0); // results is 3
* ```
*
* @name InSeries
* @param {...function} tasks - any number of async tasks.
* @returns {function} an async wrapper function that runs all of the tasks in series, calling each one with the results of the previous one
* @memberof async-patterns
*/
const InSeries = function (...tasks) {
	tasks = tasks || [];

	if (tasks.length === 0) { return PassThrough; }

	return async function (request) {
		let index = 0;

		while (index < tasks.length) {
			request = await tasks[index](request);
			index++;
		}

		return request;
	};

};

module.exports = InSeries;
