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
declare const InSeries: <T extends import("./types").Task[]>(...tasks: SeriesChain<T>) => (...args: import("./types").Accepts<T extends [infer V, ...infer W] ? V extends import("./PassThrough.types").PassThroughTask ? W extends [infer V_1, ...infer W_1] ? V_1 extends import("./PassThrough.types").PassThroughTask ? W_1 extends [infer V_2, ...infer W_2] ? V_2 extends import("./PassThrough.types").PassThroughTask ? W_2 extends [infer V_3, ...infer W_3] ? V_3 extends import("./PassThrough.types").PassThroughTask ? W_3 extends [infer V_4, ...infer W_4] ? V_4 extends import("./PassThrough.types").PassThroughTask ? W_4 extends [infer V_5, ...infer W_5] ? V_5 extends import("./PassThrough.types").PassThroughTask ? W_5 extends [infer V_6, ...infer W_6] ? V_6 extends import("./PassThrough.types").PassThroughTask ? W_6 extends [infer V_7, ...infer W_7] ? V_7 extends import("./PassThrough.types").PassThroughTask ? W_7 extends [infer V_8, ...infer W_8] ? V_8 extends import("./PassThrough.types").PassThroughTask ? W_8 extends [infer V_9, ...infer W_9] ? V_9 extends import("./PassThrough.types").PassThroughTask ? W_9 extends [infer V_10, ...infer W_10] ? V_10 extends import("./PassThrough.types").PassThroughTask ? W_10 extends [infer V_11, ...infer W_11] ? V_11 extends import("./PassThrough.types").PassThroughTask ? W_11 extends [infer V_12, ...infer W_12] ? V_12 extends import("./PassThrough.types").PassThroughTask ? W_12 extends [infer V_13, ...infer W_13] ? V_13 extends import("./PassThrough.types").PassThroughTask ? W_13 extends [infer V_14, ...infer W_14] ? V_14 extends import("./PassThrough.types").PassThroughTask ? W_14 extends [infer V_15, ...infer W_15] ? V_15 extends import("./PassThrough.types").PassThroughTask ? unknown : V_15 : W_14 extends [infer V_16] ? V_16 : unknown : V_14 : W_13 extends [infer V_17] ? V_17 : unknown : V_13 : W_12 extends [infer V_18] ? V_18 : unknown : V_12 : W_11 extends [infer V_19] ? V_19 : unknown : V_11 : W_10 extends [infer V_20] ? V_20 : unknown : V_10 : W_9 extends [infer V_21] ? V_21 : unknown : V_9 : W_8 extends [infer V_22] ? V_22 : unknown : V_8 : W_7 extends [infer V_23] ? V_23 : unknown : V_7 : W_6 extends [infer V_24] ? V_24 : unknown : V_6 : W_5 extends [infer V_25] ? V_25 : unknown : V_5 : W_4 extends [infer V_26] ? V_26 : unknown : V_4 : W_3 extends [infer V_27] ? V_27 : unknown : V_3 : W_2 extends [infer V_28] ? V_28 : unknown : V_2 : W_1 extends [infer V_29] ? V_29 : unknown : V_1 : W extends [infer V_30] ? V_30 : unknown : V : T extends [infer V_31] ? V_31 : unknown, any>) => Promise<import("./types").PromiseResult<import("./types").Returns<T extends [...infer W_16, infer V_32] ? V_32 extends import("./PassThrough.types").PassThroughTask ? W_16 extends [...infer W_17, infer V_33] ? V_33 extends import("./PassThrough.types").PassThroughTask ? W_17 extends [...infer W_18, infer V_34] ? V_34 extends import("./PassThrough.types").PassThroughTask ? W_18 extends [...infer W_19, infer V_35] ? V_35 extends import("./PassThrough.types").PassThroughTask ? W_19 extends [...infer W_20, infer V_36] ? V_36 extends import("./PassThrough.types").PassThroughTask ? W_20 extends [...infer W_21, infer V_37] ? V_37 extends import("./PassThrough.types").PassThroughTask ? W_21 extends [...infer W_22, infer V_38] ? V_38 extends import("./PassThrough.types").PassThroughTask ? W_22 extends [...infer W_23, infer V_39] ? V_39 extends import("./PassThrough.types").PassThroughTask ? W_23 extends [...infer W_24, infer V_40] ? V_40 extends import("./PassThrough.types").PassThroughTask ? W_24 extends [...infer W_25, infer V_41] ? V_41 extends import("./PassThrough.types").PassThroughTask ? W_25 extends [...infer W_26, infer V_42] ? V_42 extends import("./PassThrough.types").PassThroughTask ? W_26 extends [...infer W_27, infer V_43] ? V_43 extends import("./PassThrough.types").PassThroughTask ? W_27 extends [...infer W_28, infer V_44] ? V_44 extends import("./PassThrough.types").PassThroughTask ? W_28 extends [...infer W_29, infer V_45] ? V_45 extends import("./PassThrough.types").PassThroughTask ? W_29 extends [...infer W_30, infer V_46] ? V_46 extends import("./PassThrough.types").PassThroughTask ? W_30 extends [...infer W_31, infer V_47] ? V_47 extends import("./PassThrough.types").PassThroughTask ? unknown : V_47 : W_30 extends [infer V_48] ? V_48 : unknown : V_46 : W_29 extends [infer V_49] ? V_49 : unknown : V_45 : W_28 extends [infer V_50] ? V_50 : unknown : V_44 : W_27 extends [infer V_51] ? V_51 : unknown : V_43 : W_26 extends [infer V_52] ? V_52 : unknown : V_42 : W_25 extends [infer V_53] ? V_53 : unknown : V_41 : W_24 extends [infer V_54] ? V_54 : unknown : V_40 : W_23 extends [infer V_55] ? V_55 : unknown : V_39 : W_22 extends [infer V_56] ? V_56 : unknown : V_38 : W_21 extends [infer V_57] ? V_57 : unknown : V_37 : W_20 extends [infer V_58] ? V_58 : unknown : V_36 : W_19 extends [infer V_59] ? V_59 : unknown : V_35 : W_18 extends [infer V_60] ? V_60 : unknown : V_34 : W_17 extends [infer V_61] ? V_61 : unknown : V_33 : W_16 extends [infer V_62] ? V_62 : unknown : V_32 : T extends [infer V_63] ? V_63 : unknown, any>>>;
export = InSeries;
