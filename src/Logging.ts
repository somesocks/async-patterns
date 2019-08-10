
import AsyncTask from './types/AsyncTask';
import SyncTask from './types/SyncTask';

import _Promisify from './Promisify';
import _Callbackify from './Callbackify';
import _Logging from 'callback-patterns/Logging';

/**
* A logging utility.
* It passes the arguments received into all the statements, collects the results, and joins them together with newlines to build the final log statement
* @param {...function} statements - any number of logging values.  Functions are called with the calling arguments, everything else is passed directly to
* @returns {taskFunction} a logging task
* @memberof async-patterns
*/
function Logging(this : any, ...args : any[]) : AsyncTask {
	return _Promisify(_Logging.apply(this, args));
}

export = Logging;
