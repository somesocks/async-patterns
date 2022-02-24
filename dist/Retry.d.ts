import Task from './types/Task';
import PromiseResult from './types/PromiseResult';
import Accepts from './types/Accepts';
import Returns from './types/Returns';
/**
* Wraps a task and attempts to retry if it throws an error, with an exponential backoff.
* @param {taskFunction} task - the task to wrap.
* @param {object} options - an optional set of retry options.
* @param {object} options.timeout - maximum time to attempt retries.
* @param {object} options.retries - maximum number of retries to attempt.
* @returns {taskFunction} a task
* @memberof async-patterns
*/
declare function Retry<T extends Task>(task?: Task, options?: any): (...args: Accepts<T>) => Promise<PromiseResult<Returns<T>>>;
export = Retry;
