import AsyncTask from './types/AsyncTask';
import SyncTask from './types/SyncTask';
/**
* Wraps a task and ensures that only X number of instances of the task can be run in parallel.
* Requests are queued up in an unbounded FIFO queue until they can be run.
* @param {taskFunction} task - the task to throttle
* @param {number} limit - the number of instances that can run in parallel. default 1.
* @returns {taskFunction} a task
* @memberof async-patterns
*/
declare function Throttle(_1?: AsyncTask | SyncTask, _2?: number): AsyncTask;
export = Throttle;
