
import AsyncTask from './types/AsyncTask';
import SyncTask from './types/SyncTask';

import _If from 'callback-patterns/If';

import Promisify from './Promisify';
import Callbackify from './Callbackify';
import PassThrough from './PassThrough';

/**
* ```javascript
*   let If = require('async-patterns/If');
*
*   let logIfEven = If(
*     (num) => (num % 2 === 0),
*     (num) => { console.log('is even!'); },
*     (num) => { console.log('is not even!'); }
*   );
*
*   await logIfEven(1); // prints out 'is not even!' eventually
*   await logIfEven(2); // prints out 'is even!' eventually
*
* ```
* If accepts up to three tasks,
* an 'if' task, a 'then' task, and lastly an 'else' task
* note: by default, the ifTask, thenTask, and elseTask are PassThrough
* note: the ifTask can return multiple results,
* but only the first is checked for truthiness
* @param {taskFunction} ifTask - a condition task.
* @param {taskFunction} thenTask - a task to run when ifTask returns a truthy value.
* @param {taskFunction} elseTask - a task to run when ifTask returns a falsy value.
* @returns {taskFunction}
* @memberof async-patterns
*/
function If(
	_1 ?: AsyncTask | SyncTask ,
	_2 ?: AsyncTask | SyncTask,
	_3 ?: AsyncTask | SyncTask
) : AsyncTask {

	const conditionTask = Callbackify(_1 != null ? _1 : PassThrough);
	const thenTask = Callbackify(_2 != null ? _2 : PassThrough);
	const elseTask = Callbackify(_3 != null ? _3 : PassThrough);

	return Promisify(_If(conditionTask, thenTask, elseTask));
}

export = If;
