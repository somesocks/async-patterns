
import { Task } from './types';
import CallbackTask from './types/CallbackTask';

import _Promisify from './Promisify';
import _Callbackify from './Callbackify';
import PassThrough from './PassThrough';

import _Timer from 'callback-patterns/Timer';

// quick hack to fix a bad type declaration from callback-patterns/Timer
const _Timer2 = _Timer as (CallbackTask, string) => CallbackTask;


type _UWP<T> = T extends Promise<infer U> ? U : T;

// type _Returns<T> = T extends (...args : any) => any ? ReturnType<T> : never;
type _RET<T> = T extends (...args : any) => any ? ReturnType<T> : any;
type _ACC<T> = T extends (...args : any) => any ? Parameters<T> : any;


var EMPTY_TASK = _Promisify(
	function (next) { next(); }
);

/**
* Wraps a task and logs how long it takes to finish, or fail.
* @param {taskFunction} task - the task to wrap.
* @param {string} label - an optional label to log.
* @returns {taskFunction} a task
* @memberof async-patterns
*/
function Timer<T extends Task>(_1 ?: T, _2 ?: string) : (...args : _ACC<T>) => Promise<_UWP<_RET<T>>> {
	var task = _Callbackify(_1 || EMPTY_TASK);
	var label = _2;

	return _Promisify(
		_Timer2(task, label)
	);
}

export = Timer;
