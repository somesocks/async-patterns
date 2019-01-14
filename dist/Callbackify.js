
const PassThrough = require('./PassThrough');

/**
* ```javascript
	const task = Callbackify(
		async (i) => i + 1
	);

	// logs 'res 1', eventually
	task(
		(err, res) => console.log('res', res),
		0
	);
* ```
*
* @name Callbackify
* @param {function} task - an async function
* @returns {function} a callback-expecting function
* @memberof async-patterns
*/
const Callbackify = function (task) {
	task = task || PassThrough;

	return function (callback, request) {
		let promise = task(request);
		promise = promise instanceof Promise ? promise : Promise.resolve(promise);
		promise
			.then(result => callback(null, result))
			.catch(error => callback(error));
	};
};

module.exports = Callbackify;
