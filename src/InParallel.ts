
import PassThrough from './PassThrough';

// import { ParallelTask, ParallelArgs, ParallelResult } from './InParallel.types';

type Task = (...args : any) => any;

type PromiseResult<T> = T extends Promise<infer U> ? U : T;

type Returns<T, DEFAULT = any> = T extends (...args : any) => any ? ReturnType<T> : DEFAULT;

type Accepts<T, DEFAULT = any> = T extends (...args : any) => any ? Parameters<T> : DEFAULT;

type RET<T> = Returns<T>;
type ACC<T> = Accepts<T, any[]>;

// the boxing and brand are a hack to work around limitations of recursive generics
// one consequence of this is a finite limit on the search pattern FIRST and LAST use
// to find the arguments and results for an InSeries function
type RES_UNBOX<T> =
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U, tail: infer V } ? [ U, ...RES_UNBOX2<V> ] :
  T extends { brand: 'aegqPhq3SqmnD9Cvp7OhXQ', head: infer U } ? [ U ] :
  T extends { brand: 'FuAKcRSZRzyuO6apiynTGQ' } ? [ ] :
  never;
type RES_UNBOX2<T> =
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U, tail: infer V } ? [ U, ...RES_UNBOX3<V> ] :
  T extends { brand: 'aegqPhq3SqmnD9Cvp7OhXQ', head: infer U } ? [ U ] :
  T extends { brand: 'FuAKcRSZRzyuO6apiynTGQ' } ? [ ] :
  never;
type RES_UNBOX3<T> =
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U, tail: infer V } ? [ U, ...RES_UNBOX4<V> ] :
  T extends { brand: 'aegqPhq3SqmnD9Cvp7OhXQ', head: infer U } ? [ U ] :
  T extends { brand: 'FuAKcRSZRzyuO6apiynTGQ' } ? [ ] :
  never;
type RES_UNBOX4<T> =
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U, tail: infer V } ? [ U, ...RES_UNBOX5<V> ] :
  T extends { brand: 'aegqPhq3SqmnD9Cvp7OhXQ', head: infer U } ? [ U ] :
  T extends { brand: 'FuAKcRSZRzyuO6apiynTGQ' } ? [ ] :
  never;
type RES_UNBOX5<T> =
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U, tail: infer V } ? [ U, ...RES_UNBOX6<V> ] :
  T extends { brand: 'aegqPhq3SqmnD9Cvp7OhXQ', head: infer U } ? [ U ] :
  T extends { brand: 'FuAKcRSZRzyuO6apiynTGQ' } ? [ ] :
  never;
type RES_UNBOX6<T> =
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U, tail: infer V } ? [ U, ...RES_UNBOX7<V> ] :
  T extends { brand: 'aegqPhq3SqmnD9Cvp7OhXQ', head: infer U } ? [ U ] :
  T extends { brand: 'FuAKcRSZRzyuO6apiynTGQ' } ? [ ] :
  never;
type RES_UNBOX7<T> =
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U, tail: infer V } ? [ U, ...RES_UNBOX8<V> ] :
  T extends { brand: 'aegqPhq3SqmnD9Cvp7OhXQ', head: infer U } ? [ U ] :
  T extends { brand: 'FuAKcRSZRzyuO6apiynTGQ' } ? [ ] :
  never;
type RES_UNBOX8<T> =
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U, tail: infer V } ? [ U, ...RES_UNBOX9<V> ] :
  T extends { brand: 'aegqPhq3SqmnD9Cvp7OhXQ', head: infer U } ? [ U ] :
  T extends { brand: 'FuAKcRSZRzyuO6apiynTGQ' } ? [ ] :
  never;
type RES_UNBOX9<T> = [];


type _BUILD_RES<T> = T extends Task ? PromiseResult<RET<T>> : never;

// this is an ugly hack to get around the recursive type limitation in TS
// type _verifyChain<T extends any, U extends any[]> =
// type _RES<T extends any[]> =
//   T extends [ infer HEAD, ...infer TAIL ] ? { '5Z7RupztR4SHT30zgDbkfA-head': _BUILD_RES<HEAD>, '5Z7RupztR4SHT30zgDbkfA-tail': _RES<TAIL>, HEAD: HEAD, TAIL: TAIL } :
//   T extends [ infer HEAD ] ? { 'aegqPhq3SqmnD9Cvp7OhXQ-head': _BUILD_RES<HEAD>, HEAD: HEAD } :
//   { 'FuAKcRSZRzyuO6apiynTGQ' : true };

type _RES<T extends any[]> = T extends [infer HEAD, ...infer TAIL] ? {
      brand: '5Z7RupztR4SHT30zgDbkfA',
      head: _BUILD_RES<HEAD>;
      tail: _RES<TAIL>;
      // debug: { HEAD, TAIL }
  } : T extends [infer HEAD] ? {
      brand: 'aegqPhq3SqmnD9Cvp7OhXQ',
      head: _BUILD_RES<HEAD>;
      // debug: { HEAD }
  } : {
      brand: 'FuAKcRSZRzyuO6apiynTGQ',
  };

type RES<T extends any[]> = RES_UNBOX<_RES<T>>;
// type RES<T extends any[]> = _RES<T>;

type UnionToIntersection<U> = (U extends any ? (k : U) => void : never) extends ((k : infer I) => void) ? I : never;

type IfEquals<T, U, Y=unknown, N=never> =
  (<G>() => G extends T ? 1 : 2) extends
  (<G>() => G extends U ? 1 : 2) ? Y : N;

type ParallelArg<T> = T extends Task ?
  ACC<T> extends [infer U] ? [ IfEquals<U, any, unknown, U> ] :
  ACC<T> extends [] ? unknown[] :
  any : unknown[];

type BoxedParallelArgs<T extends Task[]> = {
  [P in keyof T] : { _box : ParallelArg<T[P]> }
} [Exclude<keyof T, keyof any[]>];

type UnboxIntersection<T> = T extends { _box : infer U } ? U : never;

type ParallelTask = Task;

type ParallelArgs<T extends ParallelTask[]> =
  T extends [ ...infer U ] ? UnboxIntersection<UnionToIntersection<BoxedParallelArgs<T>>> :
  T extends (infer U)[] ? ParallelArg<U> :
  [];

type ParallelResult<T extends ParallelTask[]> =
  T extends [ ...infer U ] ? RES<T> :
  T extends (infer U)[] ? _BUILD_RES<U> :
  unknown;






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
const InParallel = function <T extends ParallelTask[]>(...tasks : T) : (...args: ParallelArgs<T>) => Promise<ParallelResult<T>> {
	tasks = tasks || [];

	if (tasks.length === 0) { return PassThrough; }

	return async function (request) {

		const results = await Promise.all(tasks.map(task => task(request)));

		return results;
	} as any;
};

export = InParallel;
