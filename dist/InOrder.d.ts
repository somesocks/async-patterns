import { OrderArgs, OrderResult, OrderChain } from './InOrder.types';
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
declare const InOrder: <T extends import("./types").Task[]>(...tasks: OrderChain<T>) => (...args: Parameters<import("./types").First<T>>) => Promise<Parameters<import("./types").First<T>>[0] extends Promise<infer U> ? U : Parameters<import("./types").First<T>>[0]>;
export = InOrder;
