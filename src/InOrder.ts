
import PassThrough from './PassThrough';


type Task = (...args : any) => any;

type PromiseResult<T> = T extends Promise<infer U> ? U : T;

type Returns<T, DEFAULT = any> = T extends (...args : any) => any ? ReturnType<T> : DEFAULT;

type Accepts<T, DEFAULT = any> = T extends (...args : any) => any ? Parameters<T> : DEFAULT;

type PR<T> = PromiseResult<T>;
type RET<T> = Returns<T>;
type ACC<T> = Accepts<T, any[]>;

type UnionToIntersection<U> = (U extends any ? (k : U) => void : never) extends ((k : infer I) => void) ? I : never;

type IfEquals<T, U, Y, N> =
  (<G>() => G extends T ? 1 : 2) extends
  (<G>() => G extends U ? 1 : 2) ? Y : N;

// type OrderArg<T> = T extends Task ? ACC<T>[0] : unknown;
type OrderArg<T> = T extends Task ?
  ACC<T> extends [infer U] ? [ IfEquals<U, any, unknown, U> ] :
  ACC<T> extends [] ? unknown[] :
  any : unknown[];


type BoxedOrderArgs<T extends Task[]> = {
  [P in keyof T] : { _box : OrderArg<T[P]> }
} [Exclude<keyof T, keyof any[]>];

type UnboxIntersection<T> = T extends { _box : infer U } ? U : never;

type OrderTask = Task;

type OrderArgs<T extends OrderTask[]> =
  T extends [ ...infer U ] ? UnboxIntersection<UnionToIntersection<BoxedOrderArgs<T>>> :
  T extends (infer U)[] ? OrderArg<U> :
  unknown;

type OrderResult<T extends OrderTask[]> = OrderArgs<T>[0];



/**
* ```javascript
*
* let InOrder = require('async-patterns/InOrder');
*
*	const task = InOrder(
*		async (i) => i + 1,
*		async (i) => i + 1,
*		async (i) => i + 1
*	);
*
*	await task(0); // returns 3
*
* ```
*
* @name InOrder
* @param {...function} tasks - any number of async tasks.
* @returns {function} an async wrapper function that runs all of the tasks in order, calling each one with original request
* @memberof async-patterns
*/
const InOrder = function<T extends OrderTask[]>(...tasks : T) : ( ...args : OrderArgs<T>) => Promise<OrderResult<T>> {
	tasks = tasks || [];

	if (tasks.length === 0) { return PassThrough; }

	return async function (request) {
		let index = 0;

		while (index < tasks.length) {
			await tasks[index](request);
			index++;
		}

		return request;
	} as any;

};

export = InOrder;
