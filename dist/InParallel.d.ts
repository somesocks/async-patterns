declare type Task = (...args: any) => any;
declare type PromiseResult<T> = T extends Promise<infer U> ? U : T;
declare type Returns<T, DEFAULT = any> = T extends (...args: any) => any ? ReturnType<T> : DEFAULT;
declare type Accepts<T, DEFAULT = any> = T extends (...args: any) => any ? Parameters<T> : DEFAULT;
declare type RET<T> = Returns<T>;
declare type ACC<T> = Accepts<T, any[]>;
declare type RES_UNBOX<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
    tail: infer V;
} ? [U, ...RES_UNBOX2<V>] : T extends {
    brand: 'aegqPhq3SqmnD9Cvp7OhXQ';
    head: infer U;
} ? [U] : T extends {
    brand: 'FuAKcRSZRzyuO6apiynTGQ';
} ? [] : never;
declare type RES_UNBOX2<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
    tail: infer V;
} ? [U, ...RES_UNBOX3<V>] : T extends {
    brand: 'aegqPhq3SqmnD9Cvp7OhXQ';
    head: infer U;
} ? [U] : T extends {
    brand: 'FuAKcRSZRzyuO6apiynTGQ';
} ? [] : never;
declare type RES_UNBOX3<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
    tail: infer V;
} ? [U, ...RES_UNBOX4<V>] : T extends {
    brand: 'aegqPhq3SqmnD9Cvp7OhXQ';
    head: infer U;
} ? [U] : T extends {
    brand: 'FuAKcRSZRzyuO6apiynTGQ';
} ? [] : never;
declare type RES_UNBOX4<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
    tail: infer V;
} ? [U, ...RES_UNBOX5<V>] : T extends {
    brand: 'aegqPhq3SqmnD9Cvp7OhXQ';
    head: infer U;
} ? [U] : T extends {
    brand: 'FuAKcRSZRzyuO6apiynTGQ';
} ? [] : never;
declare type RES_UNBOX5<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
    tail: infer V;
} ? [U, ...RES_UNBOX6<V>] : T extends {
    brand: 'aegqPhq3SqmnD9Cvp7OhXQ';
    head: infer U;
} ? [U] : T extends {
    brand: 'FuAKcRSZRzyuO6apiynTGQ';
} ? [] : never;
declare type RES_UNBOX6<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
    tail: infer V;
} ? [U, ...RES_UNBOX7<V>] : T extends {
    brand: 'aegqPhq3SqmnD9Cvp7OhXQ';
    head: infer U;
} ? [U] : T extends {
    brand: 'FuAKcRSZRzyuO6apiynTGQ';
} ? [] : never;
declare type RES_UNBOX7<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
    tail: infer V;
} ? [U, ...RES_UNBOX8<V>] : T extends {
    brand: 'aegqPhq3SqmnD9Cvp7OhXQ';
    head: infer U;
} ? [U] : T extends {
    brand: 'FuAKcRSZRzyuO6apiynTGQ';
} ? [] : never;
declare type RES_UNBOX8<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
    tail: infer V;
} ? [U, ...RES_UNBOX9<V>] : T extends {
    brand: 'aegqPhq3SqmnD9Cvp7OhXQ';
    head: infer U;
} ? [U] : T extends {
    brand: 'FuAKcRSZRzyuO6apiynTGQ';
} ? [] : never;
declare type RES_UNBOX9<T> = [];
declare type _BUILD_RES<T> = T extends Task ? PromiseResult<RET<T>> : never;
declare type _RES<T extends any[]> = T extends [infer HEAD, ...infer TAIL] ? {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: _BUILD_RES<HEAD>;
    tail: _RES<TAIL>;
} : T extends [infer HEAD] ? {
    brand: 'aegqPhq3SqmnD9Cvp7OhXQ';
    head: _BUILD_RES<HEAD>;
} : {
    brand: 'FuAKcRSZRzyuO6apiynTGQ';
};
declare type RES<T extends any[]> = RES_UNBOX<_RES<T>>;
declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
declare type IfEquals<T, U, Y = unknown, N = never> = (<G>() => G extends T ? 1 : 2) extends (<G>() => G extends U ? 1 : 2) ? Y : N;
declare type ParallelArg<T> = T extends Task ? ACC<T> extends [infer U] ? [IfEquals<U, any, unknown, U>] : ACC<T> extends [] ? unknown[] : any : unknown[];
declare type BoxedParallelArgs<T extends Task[]> = {
    [P in keyof T]: {
        _box: ParallelArg<T[P]>;
    };
}[Exclude<keyof T, keyof any[]>];
declare type UnboxIntersection<T> = T extends {
    _box: infer U;
} ? U : never;
declare type ParallelTask = Task;
declare type ParallelArgs<T extends ParallelTask[]> = T extends [...infer U] ? UnboxIntersection<UnionToIntersection<BoxedParallelArgs<T>>> : T extends (infer U)[] ? ParallelArg<U> : [
];
declare type ParallelResult<T extends ParallelTask[]> = T extends [...infer U] ? RES<T> : T extends (infer U)[] ? _BUILD_RES<U> : unknown;
/**
* ```javascript
*
* let InParallel = require('async-patterns/InParallel');
*
*	const task = InParallel(
*		async (i) => i + 1,
*		async (i) => i + 2,
*		async (i) => i + 3
*	);
*
*	const results = await task(0); // results is [1, 2, 3]
*
* ```
*
* @name InParallel
* @param {...function} tasks - any number of async tasks.
* @returns {function} an async wrapper function that runs all the tasks in parallel, and returns an array of results
* @memberof async-patterns
*/
declare const InParallel: <T extends Task[]>(...tasks: T) => (...args: ParallelArgs<T>) => Promise<ParallelResult<T>>;
export = InParallel;
