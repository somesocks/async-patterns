
import { Task } from './types';

import _Promisify from './Promisify';
import _Callbackify from './Callbackify';
import PassThrough from './PassThrough';

import _TimeOut from 'callback-patterns/TimeOut';

type _UWP<T> = T extends Promise<infer U> ? U : T;

// type _Returns<T> = T extends (...args : any) => any ? ReturnType<T> : never;
type _RET<T> = T extends (...args : any) => any ? ReturnType<T> : any;
type _ACC<T> = T extends (...args : any) => any ? Parameters<T> : any;



/**
*
* ```javascript
*
*   let TimeOut = require('async-patterns/TimeOut');
*
*   let task = TimeOut(
*     async function (...args) {},
*			1000
*   );
*
*   await task(...args);
*
* ```
*
* TimeOut wraps a single task function, and returns a function that returns early if the task fails to complete before the timeout triggers.
*
* NOTE: the timeout being triggered will not cancel the original task.
*
* @param {taskFunction} task - the task to wrap in a timeout.
* @param {number} ms - the timeout in ms.
* @returns {taskFunction} a task
* @memberof async-patterns
*/
function TimeOut<T extends Task>(_1 ?: Task, _2 ?: number) : (...args : _ACC<T>) => Promise<_UWP<_RET<T>>> {
	var task = _Callbackify(_1 || PassThrough);
	var ms = _2 || 1000;

	return _Promisify(
		_TimeOut(task, ms)
	) as any;
}

export = TimeOut;
