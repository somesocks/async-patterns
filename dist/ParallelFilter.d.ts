import AsyncTask from './types/AsyncTask';
import SyncTask from './types/SyncTask';
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
* @memberof async-patterns
*/
declare const ParallelFilter: (task?: AsyncTask | SyncTask | undefined) => AsyncTask;
export = ParallelFilter;
