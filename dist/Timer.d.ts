import AsyncTask from './types/AsyncTask';
import SyncTask from './types/SyncTask';
/**
* Wraps a task and logs how long it takes to finish, or fail.
* @param {taskFunction} task - the task to wrap.
* @param {string} label - an optional label to log.
* @returns {taskFunction} a task
* @memberof async-patterns
*/
declare function Timer(_1?: AsyncTask | SyncTask, _2?: string): AsyncTask;
export = Timer;
