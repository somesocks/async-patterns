
import { Task, Accepts, Returns, PromiseResult } from './types';

import { PassThroughTask } from './PassThrough.types';

type PR<T> = PromiseResult<T>;
type RET<T> = Returns<T>;
type ACC<T> = Accepts<T, any[]>;

// the boxing and brand are a hack to work around limitations of recursive generics
// one consequence of this is a finite limit on the search pattern FIRST and LAST use
// to find the arguments and results for an InSeries function
type RES_UNBOX<T> =
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U, tail: infer V } ? [ U, ...RES_UNBOX2<V> ] :
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U } ? [ U ] :
  [];
type RES_UNBOX2<T> =
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U, tail: infer V } ? [ U, ...RES_UNBOX3<V> ] :
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U } ? [ U ] :
  [];
type RES_UNBOX3<T> =
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U, tail: infer V } ? [ U, ...RES_UNBOX4<V> ] :
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U } ? [ U ] :
  [];
type RES_UNBOX4<T> =
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U, tail: infer V } ? [ U, ...RES_UNBOX5<V> ] :
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U } ? [ U ] :
  [];
type RES_UNBOX5<T> =
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U, tail: infer V } ? [ U, ...RES_UNBOX6<V> ] :
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U } ? [ U ] :
  [];
type RES_UNBOX6<T> =
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U, tail: infer V } ? [ U, ...RES_UNBOX7<V> ] :
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U } ? [ U ] :
  [];
type RES_UNBOX7<T> =
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U, tail: infer V } ? [ U, ...RES_UNBOX8<V> ] :
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U } ? [ U ] :
  [];
type RES_UNBOX8<T> =
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U, tail: infer V } ? [ U, ...RES_UNBOX9<V> ] :
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U } ? [ U ] :
  [];
type RES_UNBOX9<T> = [];


type _BUILD_RES<T> = T extends Task ? PR<RET<T>> : never;

// this is an ugly hack to get around the recursive type limitation in TS
// type _verifyChain<T extends any, U extends any[]> =
type _RES<T extends any[]> =
  T extends [ infer HEAD, ...infer TAIL ] ? { brand: '5Z7RupztR4SHT30zgDbkfA', head: _BUILD_RES<HEAD>, tail: _RES<TAIL> } :
  T extends [ infer HEAD ] ? { brand: '5Z7RupztR4SHT30zgDbkfA', head: _BUILD_RES<HEAD> } :
  { brand: '5Z7RupztR4SHT30zgDbkfA' };

type RES<T extends any[]> = RES_UNBOX<_RES<T>>;



type UnionToIntersection<U> = (U extends any ? (k : U) => void : never) extends ((k : infer I) => void) ? I : never;

type IfEquals<T, U, Y=unknown, N=never> =
  (<G>() => G extends T ? 1 : 2) extends
  (<G>() => G extends U ? 1 : 2) ? Y : N;

type BoxedParallelArgs<T extends Task[]> = {
  [P in keyof T] : { _box : OrderArg<T[P]> }
} [Exclude<keyof T, keyof any[]>];

type OrderArg<T> =
  T extends Task ? IfEquals<ACC<T>[0], any, unknown, ACC<T>[0]> : unknown;

type UnboxIntersection<T> = T extends { _box : infer U } ? U : never;

export type ParallelTask = Task;

export type ParallelArgs<T extends ParallelTask[]> = UnboxIntersection<UnionToIntersection<BoxedParallelArgs<T>>>;

export type ParallelResult<T extends ParallelTask[]> = PR<RES<T>>;
