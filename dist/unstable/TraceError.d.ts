import Task from '../types/Task';
import PromiseResult from '../types/PromiseResult';
import Accepts from '../types/Accepts';
import Returns from '../types/Returns';
/**
* TraceError is an experimental wrapper that attempts to make errors more informative.
* It does this by appending extra information to the stack of any error thrown in the task.
*
* NOTE: TraceError is marked as 'unstable' as stack traces in JS are not standardized,
* so it may not always provide useful information.
*
* @param {function} task - a task function to wrap
* @returns {function} a wrapper function that modifies the stack trace of any errors thrown within
* @memberof async-patterns.unstable
*/
declare function TraceError<T extends Task>(_1?: Task): (...args: Accepts<T>) => Promise<PromiseResult<Returns<T>>>;
export = TraceError;
