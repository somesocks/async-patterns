
import PassThrough from './PassThrough';

import { OrderTask, OrderArgs, OrderResult } from './InOrder.types';

/**
* ```javascript
*
* let InOrder = require('async-patterns/InOrder');
*
*	const task = InOrder(
*		async (i) => i + 1,
*		async (i) => i + 1,
*		async (i) => i + 1
*	);
*
*	await task(0); // returns 3
*
* ```
*
* @name InOrder
* @param {...function} tasks - any number of async tasks.
* @returns {function} an async wrapper function that runs all of the tasks in order, calling each one with original request
* @memberof async-patterns
*/
const InOrder = function<T extends OrderTask[]>(...tasks : T) : (arg : OrderArgs<T>) => Promise<OrderResult<T>> {
	tasks = tasks || [];

	if (tasks.length === 0) { return PassThrough; }

	return async function (request) {
		let index = 0;

		while (index < tasks.length) {
			await tasks[index](request);
			index++;
		}

		return request;
	} as any;

};

export = InOrder;
