import { SeriesChain, SeriesArgs, SeriesResult } from './InSeries.types';
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
declare const InSeries: <T extends import("./types").Task[]>(...tasks: SeriesChain<T>) => (...args: import("./InSeries.types")._ACC<import("./InSeries.types")._FIRST<T>>) => Promise<import("./InSeries.types")._UWP<import("./InSeries.types")._RET<import("./InSeries.types")._LAST<T>>>>;
export = InSeries;
