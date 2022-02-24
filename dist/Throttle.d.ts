import Task from './types/Task';
import PromiseResult from './types/PromiseResult';
import Accepts from './types/Accepts';
import Returns from './types/Returns';
/**
* Wraps a task and ensures that only X number of instances of the task can be run in parallel.
* Requests are queued up in an unbounded FIFO queue until they can be run.
* @param {taskFunction} task - the task to throttle
* @param {number} limit - the number of instances that can run in parallel. default 1.
* @returns {taskFunction} a task
* @memberof async-patterns
*/
declare function Throttle<T extends Task>(_1?: Task, _2?: number): (...args: Accepts<T>) => Promise<PromiseResult<Returns<T>>>;
export = Throttle;
