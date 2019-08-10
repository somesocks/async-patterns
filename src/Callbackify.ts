
import AsyncTask from './types/AsyncTask';
import SyncTask from './types/SyncTask';
import CallbackTask from './types/CallbackTask';

import PassThrough from './PassThrough';

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
const Callbackify = function (task ?: AsyncTask | SyncTask) : CallbackTask {
	const task2 = task || PassThrough;

	return function (callback, request) {
		let promise = task2(request);
		promise = promise instanceof Promise ? promise : Promise.resolve(promise);
		promise
			.then(result => callback(null, result))
			.catch(error => callback(error));
	};
};

export = Callbackify;
