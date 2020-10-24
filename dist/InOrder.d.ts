import { OrderArgs, OrderResult } from './InOrder.types';
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
declare const InOrder: <T extends import("./types").Task[]>(...tasks: T) => (arg: (({ [P in keyof T]: {
    _box: T[P] extends import("./types").Task ? <G>() => G extends import("./types").Accepts<T[P], any[]>[0] ? 1 : 2 extends <G_1>() => G_1 extends any ? 1 : 2 ? unknown : import("./types").Accepts<T[P], any[]>[0] : unknown;
}; }[Exclude<keyof T, number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">] extends any ? (k: { [P in keyof T]: {
    _box: T[P] extends import("./types").Task ? <G>() => G extends import("./types").Accepts<T[P], any[]>[0] ? 1 : 2 extends <G_1>() => G_1 extends any ? 1 : 2 ? unknown : import("./types").Accepts<T[P], any[]>[0] : unknown;
}; }[Exclude<keyof T, number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]) => void : never) extends (k: infer I) => void ? I : never) extends {
    _box: infer U;
} ? U : never) => Promise<import("./types").PromiseResult<(({ [P in keyof T]: {
    _box: T[P] extends import("./types").Task ? <G>() => G extends import("./types").Accepts<T[P], any[]>[0] ? 1 : 2 extends <G_1>() => G_1 extends any ? 1 : 2 ? unknown : import("./types").Accepts<T[P], any[]>[0] : unknown;
}; }[Exclude<keyof T, number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">] extends any ? (k: { [P in keyof T]: {
    _box: T[P] extends import("./types").Task ? <G>() => G extends import("./types").Accepts<T[P], any[]>[0] ? 1 : 2 extends <G_1>() => G_1 extends any ? 1 : 2 ? unknown : import("./types").Accepts<T[P], any[]>[0] : unknown;
}; }[Exclude<keyof T, number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]) => void : never) extends (k: infer I) => void ? I : never) extends {
    _box: infer U;
} ? U : never>>;
export = InOrder;
