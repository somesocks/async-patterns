import { SeriesChain, SeriesArgs, SeriesResult } from './InSeries.types';
/**
* ```javascript
*
* let InSeries = require('async-patterns/InSeries');
*
*	const task = InSeries(
*		async (i) => i + 1,
*		async (i) => i + 1,
*		async (i) => i + 1
*	);
*
*	const results = await task(0); // results is 3
*
* ```
*
* @name InSeries
* @param {...function} tasks - any number of async tasks.
* @returns {function} an async wrapper function that runs all of the tasks in series, calling each one with the results of the previous one
* @memberof async-patterns
*/
declare const InSeries: <T extends import("./types/Task").default[]>(...tasks: SeriesChain<T>) => (...args: import("./types/Accepts").default<(T extends [infer V, ...infer W] ? V extends import("./PassThrough.types").PassThroughTask ? {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: W extends [infer V, ...infer W] ? V extends import("./PassThrough.types").PassThroughTask ? any : V : W extends [infer V_1] ? V_1 : unknown;
} : V : T extends [infer V_1] ? V_1 : unknown) extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U;
} ? U extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_1;
} ? U_1 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_2;
} ? U_2 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_3;
} ? U_3 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_4;
} ? U_4 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_5;
} ? U_5 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_6;
} ? U_6 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_7;
} ? U_7 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_8;
} ? U_8 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_9;
} ? U_9 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_10;
} ? U_10 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_11;
} ? U_11 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_12;
} ? U_12 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_13;
} ? U_13 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_14;
} ? U_14 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_15;
} ? unknown : U_14 : U_13 : U_12 : U_11 : U_10 : U_9 : U_8 : U_7 : U_6 : U_5 : U_4 : U_3 : U_2 : U_1 : U : T extends [infer V, ...infer W] ? V extends import("./PassThrough.types").PassThroughTask ? {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: W extends [infer V, ...infer W] ? V extends import("./PassThrough.types").PassThroughTask ? any : V : W extends [infer V_1] ? V_1 : unknown;
} : V : T extends [infer V_1] ? V_1 : unknown, any>) => Promise<import("./types/PromiseResult").default<import("./types/Returns").default<(T extends [...infer W_1, infer V_2] ? V_2 extends import("./PassThrough.types").PassThroughTask ? {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: W_1 extends [...infer W_1, infer V_2] ? V_2 extends import("./PassThrough.types").PassThroughTask ? any : V_2 : W_1 extends [infer V_3] ? V_3 : unknown;
} : V_2 : T extends [infer V_3] ? V_3 : unknown) extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U;
} ? U extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_1;
} ? U_1 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_2;
} ? U_2 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_3;
} ? U_3 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_4;
} ? U_4 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_5;
} ? U_5 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_6;
} ? U_6 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_7;
} ? U_7 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_8;
} ? U_8 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_9;
} ? U_9 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_10;
} ? U_10 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_11;
} ? U_11 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_12;
} ? U_12 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_13;
} ? U_13 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_14;
} ? U_14 extends {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: infer U_15;
} ? unknown : U_14 : U_13 : U_12 : U_11 : U_10 : U_9 : U_8 : U_7 : U_6 : U_5 : U_4 : U_3 : U_2 : U_1 : U : T extends [...infer W_1, infer V_2] ? V_2 extends import("./PassThrough.types").PassThroughTask ? {
    brand: "5Z7RupztR4SHT30zgDbkfA";
    box: W_1 extends [...infer W_1, infer V_2] ? V_2 extends import("./PassThrough.types").PassThroughTask ? any : V_2 : W_1 extends [infer V_3] ? V_3 : unknown;
} : V_2 : T extends [infer V_3] ? V_3 : unknown, any>>>;
export = InSeries;
