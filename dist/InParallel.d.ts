import { ParallelArgs, ParallelResult } from './InParallel.types';
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
declare const InParallel: <T extends import("./types").Task[]>(...tasks: T) => (args: (({ [P in keyof T]: {
    _box: T[P] extends import("./types").Task ? <G>() => G extends import("./types").Accepts<T[P], any[]>[0] ? 1 : 2 extends <G_1>() => G_1 extends any ? 1 : 2 ? unknown : import("./types").Accepts<T[P], any[]>[0] : unknown;
}; }[Exclude<keyof T, number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">] extends any ? (k: { [P in keyof T]: {
    _box: T[P] extends import("./types").Task ? <G>() => G extends import("./types").Accepts<T[P], any[]>[0] ? 1 : 2 extends <G_1>() => G_1 extends any ? 1 : 2 ? unknown : import("./types").Accepts<T[P], any[]>[0] : unknown;
}; }[Exclude<keyof T, number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]) => void : never) extends (k: infer I) => void ? I : never) extends {
    _box: infer U;
} ? U : never) => Promise<import("./types").PromiseResult<(T extends [infer HEAD, ...infer TAIL] ? {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    head: HEAD extends import("./types").Task ? import("./types").PromiseResult<import("./types").Returns<HEAD, any>> : never;
    tail: TAIL extends [infer HEAD, ...infer TAIL] ? any : TAIL extends [infer HEAD_1] ? {
        brand: "5Z7RupztR4SHT30zgDbkfA";
        head: HEAD_1 extends import("./types").Task ? import("./types").PromiseResult<import("./types").Returns<HEAD_1, any>> : never;
    } : {
        brand: "5Z7RupztR4SHT30zgDbkfA";
    };
} : T extends [infer HEAD_1] ? {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    head: HEAD_1 extends import("./types").Task ? import("./types").PromiseResult<import("./types").Returns<HEAD_1, any>> : never;
} : {
    brand: "5Z7RupztR4SHT30zgDbkfA";
}) extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    head: infer U_1;
    tail: infer V;
} ? [U_1, ...V extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    head: infer U_2;
    tail: infer V_1;
} ? [U_2, ...V_1 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    head: infer U_3;
    tail: infer V_2;
} ? [U_3, ...V_2 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    head: infer U_4;
    tail: infer V_3;
} ? [U_4, ...V_3 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    head: infer U_5;
    tail: infer V_4;
} ? [U_5, ...V_4 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    head: infer U_6;
    tail: infer V_5;
} ? [U_6, ...V_5 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    head: infer U_7;
    tail: infer V_6;
} ? [U_7, ...V_6 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    head: infer U_8;
    tail: infer V_7;
} ? [U_8] : V_6 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    head: infer U_9;
} ? [U_9] : []] : V_5 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    head: infer U_10;
} ? [U_10] : []] : V_4 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    head: infer U_11;
} ? [U_11] : []] : V_3 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    head: infer U_12;
} ? [U_12] : []] : V_2 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    head: infer U_13;
} ? [U_13] : []] : V_1 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    head: infer U_14;
} ? [U_14] : []] : V extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    head: infer U_15;
} ? [U_15] : []] : (T extends [infer HEAD, ...infer TAIL] ? {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    head: HEAD extends import("./types").Task ? import("./types").PromiseResult<import("./types").Returns<HEAD, any>> : never;
    tail: TAIL extends [infer HEAD, ...infer TAIL] ? any : TAIL extends [infer HEAD_1] ? {
        brand: "5Z7RupztR4SHT30zgDbkfA";
        head: HEAD_1 extends import("./types").Task ? import("./types").PromiseResult<import("./types").Returns<HEAD_1, any>> : never;
    } : {
        brand: "5Z7RupztR4SHT30zgDbkfA";
    };
} : T extends [infer HEAD_1] ? {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    head: HEAD_1 extends import("./types").Task ? import("./types").PromiseResult<import("./types").Returns<HEAD_1, any>> : never;
} : {
    brand: "5Z7RupztR4SHT30zgDbkfA";
}) extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    head: infer U_16;
} ? [U_16] : []>>;
export = InParallel;
