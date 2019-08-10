import AsyncTask from './types/AsyncTask';
/**
* A logging utility.
* It passes the arguments received into all the statements, collects the results, and joins them together with newlines to build the final log statement
* @param {...function} statements - any number of logging values.  Functions are called with the calling arguments, everything else is passed directly to
* @returns {taskFunction} a logging task
* @memberof async-patterns
*/
declare function Logging(this: any, ...args: any[]): AsyncTask;
export = Logging;
