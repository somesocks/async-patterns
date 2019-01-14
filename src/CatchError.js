
const PassThrough = require('./PassThrough');

/**
* ```javascript
*   let task = CatchError(task);
*
*   const { error, result } = await task(request);
* ```
*
* @name CatchError
* @param {function} task - an async function to wrap around with a catch wrapper.
* @returns {function} an async wrapper function around the task
* @memberof aah
*/
const CatchError = function CatchError(task) {
	task = task || PassThrough;

	return async function (request) {
		const val = {};

		try {
			val.result = await task(request);
		} catch (e) {
			val.error = e;
		}

		return val;
	};

};

CatchError.default = CatchError;

module.exports = CatchError;
