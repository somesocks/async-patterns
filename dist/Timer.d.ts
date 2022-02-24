import Task from './types/Task';
import PromiseResult from './types/PromiseResult';
import Accepts from './types/Accepts';
import Returns from './types/Returns';
/**
* Wraps a task and logs how long it takes to finish, or fail.
* @param {taskFunction} task - the task to wrap.
* @param {string} label - an optional label to log.
* @returns {taskFunction} a task
* @memberof async-patterns
*/
declare function Timer<T extends Task>(_1?: Task, _2?: string): (...args: Accepts<T>) => Promise<PromiseResult<Returns<T>>>;
export = Timer;
