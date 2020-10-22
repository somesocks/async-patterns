
import { Task } from './types';

import _Promisify from './Promisify';
import _Callbackify from './Callbackify';
import PassThrough from './PassThrough';

import _TimeIn from 'callback-patterns/TimeIn';


type _UWP<T> = T extends Promise<infer U> ? U : T;

// type _Returns<T> = T extends (...args : any) => any ? ReturnType<T> : never;
type _RET<T> = T extends (...args : any) => any ? ReturnType<T> : any;
type _ACC<T> = T extends (...args : any) => any ? Parameters<T> : any;


/**
*
* ```javascript
*
*   let TimeIn = require('async-patterns/TimeIn');
*
*   let task = TimeIn(
*     async function (...args) {},
*			1000
*   );
*
*   await task(...args);
*
* ```
*
* TimeIn wraps a single task function, and returns a function that only returns after X ms.
*
* @param {taskFunction} task - the task to wrap in a timeout.
* @param {number} ms - the timein in ms.
* @returns {taskFunction} a task
* @memberof async-patterns
*/
function TimeIn<T extends Task>(_1 ?: T, _2 ?: number) : (...args : _ACC<T>) => Promise<_UWP<_RET<T>>> {
	var task = _Callbackify(_1 || PassThrough);
	var ms = _2 || 1000;

	return _Promisify(
		_TimeIn(task, ms)
	) as any;
}

export = TimeIn;
