
import { Task, Accepts, Returns, PromiseResult } from './types';

import { PassThroughTask } from './PassThrough.types';

type PR<T> = PromiseResult<T>;
type RET<T> = Returns<T>;
type ACC<T> = Accepts<T>;



// the boxing and brand are a hack to work around limitations of recursive generics
// one consequence of this is a finite limit on the search pattern FIRST and LAST use
// to find the arguments and results for an InSeries function
type VC_UNBOX<T> =
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U, tail: infer V } ? [ U, ...VC_UNBOX2<V> ] :
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U } ? [ U ] :
  [];
type VC_UNBOX2<T> =
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U, tail: infer V } ? [ U, ...VC_UNBOX3<V> ] :
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U } ? [ U ] :
  [];
type VC_UNBOX3<T> =
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U, tail: infer V } ? [ U, ...VC_UNBOX4<V> ] :
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U } ? [ U ] :
  [];
type VC_UNBOX4<T> =
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U, tail: infer V } ? [ U, ...VC_UNBOX5<V> ] :
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U } ? [ U ] :
  [];
type VC_UNBOX5<T> =
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U, tail: infer V } ? [ U, ...VC_UNBOX6<V> ] :
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U } ? [ U ] :
  [];
type VC_UNBOX6<T> =
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U, tail: infer V } ? [ U, ...VC_UNBOX7<V> ] :
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U } ? [ U ] :
  [];
type VC_UNBOX7<T> =
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U, tail: infer V } ? [ U, ...VC_UNBOX8<V> ] :
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U } ? [ U ] :
  [];
type VC_UNBOX8<T> =
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U, tail: infer V } ? [ U, ...VC_UNBOX9<V> ] :
  T extends { brand: '5Z7RupztR4SHT30zgDbkfA', head: infer U } ? [ U ] :
  [];
type VC_UNBOX9<T> = [];


type _PAIR<T, V> = T extends PassThroughTask ? V : (arg : PR<RET<T>>) => RET<V>;

// this is an ugly hack to get around the recursive type limitation in TS
// type _verifyChain<T extends any, U extends any[]> =
type _VC<T extends any, U extends any[]> =
  U extends [ infer V, ...infer W ] ? { brand: '5Z7RupztR4SHT30zgDbkfA', head: _PAIR<T,V>, tail: _VC<V extends PassThroughTask ? T : V, W> } :
  U extends [ infer V ] ? { brand: '5Z7RupztR4SHT30zgDbkfA', head: _PAIR<T,V> } :
  { brand: '5Z7RupztR4SHT30zgDbkfA' };

type VC<T extends any, U extends any[]> = VC_UNBOX<_VC<T, U>>;



// the boxing and brand are a hack to work around limitations of recursive generics
// one consequence of this is a finite limit on the search pattern FIRST and LAST use
// to find the arguments and results for an InSeries function
type UNBOX<T> = T extends { brand: '5Z7RupztR4SHT30zgDbkfA', box: infer U } ? UNBOX2<U> : T;
type UNBOX2<T> = T extends { brand: '5Z7RupztR4SHT30zgDbkfA', box: infer U } ? UNBOX3<U> : T;
type UNBOX3<T> = T extends { brand: '5Z7RupztR4SHT30zgDbkfA', box: infer U } ? UNBOX4<U> : T;
type UNBOX4<T> = T extends { brand: '5Z7RupztR4SHT30zgDbkfA', box: infer U } ? UNBOX5<U> : T;
type UNBOX5<T> = T extends { brand: '5Z7RupztR4SHT30zgDbkfA', box: infer U } ? UNBOX6<U> : T;
type UNBOX6<T> = T extends { brand: '5Z7RupztR4SHT30zgDbkfA', box: infer U } ? UNBOX7<U> : T;
type UNBOX7<T> = T extends { brand: '5Z7RupztR4SHT30zgDbkfA', box: infer U } ? UNBOX8<U> : T;
type UNBOX8<T> = T extends { brand: '5Z7RupztR4SHT30zgDbkfA', box: infer U } ? UNBOX9<U> : T;
type UNBOX9<T> = T extends { brand: '5Z7RupztR4SHT30zgDbkfA', box: infer U } ? UNBOX10<U> : T;
type UNBOX10<T> = T extends { brand: '5Z7RupztR4SHT30zgDbkfA', box: infer U } ? UNBOX11<U> : T;
type UNBOX11<T> = T extends { brand: '5Z7RupztR4SHT30zgDbkfA', box: infer U } ? UNBOX12<U> : T;
type UNBOX12<T> = T extends { brand: '5Z7RupztR4SHT30zgDbkfA', box: infer U } ? UNBOX13<U> : T;
type UNBOX13<T> = T extends { brand: '5Z7RupztR4SHT30zgDbkfA', box: infer U } ? UNBOX14<U> : T;
type UNBOX14<T> = T extends { brand: '5Z7RupztR4SHT30zgDbkfA', box: infer U } ? UNBOX15<U> : T;
type UNBOX15<T> = T extends { brand: '5Z7RupztR4SHT30zgDbkfA', box: infer U } ? UNBOX16<U> : T;
type UNBOX16<T> = T extends { brand: '5Z7RupztR4SHT30zgDbkfA', box: infer U } ? UNBOX17<U> : T;
type UNBOX17<T> = unknown;

type _LAST<U extends any[]> =
  U extends [ ...infer W, infer V ] ? (V extends PassThroughTask ? { brand: '5Z7RupztR4SHT30zgDbkfA', box: _LAST<W> } : V) :
  U extends [ infer V ] ? V :
  unknown;
type LAST<T extends any[]> = UNBOX<_LAST<T>>;

type __FIRST<U extends any[]> =
  U extends [ infer V, ...infer W ] ? (V extends PassThroughTask ? { brand: '5Z7RupztR4SHT30zgDbkfA', box: __FIRST<W> } : V) :
  U extends [ infer V ] ? V :
  unknown
;
type FIRST<T extends any[]> = UNBOX<__FIRST<T>>;


export type SeriesTask = Task;

export type SeriesArgs<T extends SeriesTask[]> = ACC<FIRST<T>>;

export type SeriesResult<T extends SeriesTask[]> = PR<RET<LAST<T>>>;

export type SeriesChain<T extends SeriesTask[]> =
  T extends [infer U, ...infer V] ? [U, ...VC<U , V>] : T
