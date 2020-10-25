declare type Task = (...args: any) => any;
declare type Accepts<T, DEFAULT = any> = T extends (...args: any) => any ? Parameters<T> : DEFAULT;
declare type ACC<T> = Accepts<T, any[]>;
declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
declare type IfEquals<T, U, Y, N> = (<G>() => G extends T ? 1 : 2) extends (<G>() => G extends U ? 1 : 2) ? Y : N;
declare type OrderArg<T> = T extends Task ? ACC<T> extends [infer U] ? [IfEquals<U, any, unknown, U>] : ACC<T> extends [] ? unknown[] : any : unknown[];
declare type BoxedOrderArgs<T extends Task[]> = {
    [P in keyof T]: {
        _box: OrderArg<T[P]>;
    };
}[Exclude<keyof T, keyof any[]>];
declare type UnboxIntersection<T> = T extends {
    _box: infer U;
} ? U : never;
declare type OrderTask = Task;
declare type OrderArgs<T extends OrderTask[]> = T extends [...infer U] ? UnboxIntersection<UnionToIntersection<BoxedOrderArgs<T>>> : T extends (infer U)[] ? OrderArg<U> : unknown;
declare type OrderResult<T extends OrderTask[]> = OrderArgs<T>[0];
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
declare const InOrder: <T extends Task[]>(...tasks: T) => (...args: OrderArgs<T>) => Promise<OrderResult<T>>;
export = InOrder;
