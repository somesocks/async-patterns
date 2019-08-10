import AsyncTask from './types/AsyncTask';
import SyncTask from './types/SyncTask';
/**
* ```javascript
    const task = Race(
        async (i) => i + 1,
        async (i) => i + 2,
    );

    const result = await task(1); // 2
* ```
*
* @name Race
* @param {...function} tasks - any number of async tasks
* @returns {function} an async task that resolves or rejects as soon as the first one of its "children" resolves or rejects
* @memberof async-patterns
*/
declare const Race: (...tasks: (AsyncTask | SyncTask)[]) => AsyncTask;
export = Race;
