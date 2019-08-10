import AsyncTask from './types/AsyncTask';
import SyncTask from './types/SyncTask';
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
* @memberof async-patterns
*/
declare const ParallelMap: (task?: AsyncTask | SyncTask | undefined) => AsyncTask;
export = ParallelMap;
