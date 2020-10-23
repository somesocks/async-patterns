
import { Task, Accepts, Returns, PromiseResult } from './types';

import { PassThroughTask } from './PassThrough.types';

type PR<T> = PromiseResult<T>;
type RET<T> = Returns<T>;
type ACC<T> = Accepts<T>;


type _PAIR<T, V> = T extends PassThroughTask ? V : (arg : PR<RET<T>>) => RET<V>;

// this is an ugly hack to get around the recursive type limitation in TS
// type _verifyChain<T extends any, U extends any[]> =
type _VC<T extends any, U extends any[]> =
  U extends [ infer V, ...infer W ] ? [ _PAIR<T,V>, ..._VC2<V extends PassThroughTask ? T : V, W> ] :
  U extends [ infer V ] ? [ _PAIR<T,V>, ] :
  U;
type _VC2<T extends any, U extends any[]> =
  U extends [ infer V, ...infer W ] ? [ _PAIR<T,V>, ..._VC3<V extends PassThroughTask ? T : V, W> ] :
  U extends [ infer V ] ? [ _PAIR<T,V> ] :
  U;
type _VC3<T extends any, U extends any[]> =
  U extends [ infer V, ...infer W ] ? [ _PAIR<T,V>, ..._VC4<V extends PassThroughTask ? T : V, W> ] :
  U extends [ infer V ] ? [ _PAIR<T,V> ] :
  U;
type _VC4<T extends any, U extends any[]> =
  U extends [ infer V, ...infer W ] ? [ _PAIR<T,V>, ..._VC5<V extends PassThroughTask ? T : V, W> ] :
  U extends [ infer V ] ? [ _PAIR<T,V> ] :
  U;
type _VC5<T extends any, U extends any[]> =
  U extends [ infer V, ...infer W ] ? [ _PAIR<T,V>, ..._VC6<V extends PassThroughTask ? T : V, W> ] :
  U extends [ infer V ] ? [ _PAIR<T,V> ] :
  U;
type _VC6<T extends any, U extends any[]> =
  U extends [ infer V, ...infer W ] ? [ _PAIR<T,V>, ..._VC7<V extends PassThroughTask ? T : V, W> ] :
  U extends [ infer V ] ? [ _PAIR<T,V> ] :
  U;
type _VC7<T extends any, U extends any[]> =
  U extends [ infer V, ...infer W ] ? [ _PAIR<T,V>, ..._VC8<V extends PassThroughTask ? T : V, W> ] :
  U extends [ infer V ] ? [ _PAIR<T,V> ] :
  U;
type _VC8<T extends any, U extends any[]> =
  U extends [ infer V, ...infer W ] ? [ _PAIR<T,V>, ..._VC9<V extends PassThroughTask ? T : V, W> ] :
  U extends [ infer V ] ? [ _PAIR<T,V> ] :
  U;
type _VC9<T extends any, U extends any[]> =
  U extends [ infer V, ...infer W ] ? [ _PAIR<T,V>, ..._VC10<V extends PassThroughTask ? T : V, W> ] :
  U extends [ infer V ] ? [ _PAIR<T,V> ] :
  U;
type _VC10<T extends any, U extends any[]> =
  U extends [ infer V, ...infer W ] ? [ _PAIR<T,V>, ..._VC11<V extends PassThroughTask ? T : V, W> ] :
  U extends [ infer V ] ? [ _PAIR<T,V> ] :
  U;
type _VC11<T extends any, U extends any[]> =
  U extends [ infer V, ...infer W ] ? [ _PAIR<T,V>, ..._VC12<V extends PassThroughTask ? T : V, W> ] :
  U extends [ infer V ] ? [ _PAIR<T,V> ] :
  U;
type _VC12<T extends any, U extends any[]> =
  U extends [ infer V, ...infer W ] ? [ _PAIR<T,V>, ..._VC13<V extends PassThroughTask ? T : V, W> ] :
  U extends [ infer V ] ? [ _PAIR<T,V> ] :
  U;
type _VC13<T extends any, U extends any[]> =
  U extends [ infer V, ...infer W ] ? [ _PAIR<T,V>, ..._VC14<V extends PassThroughTask ? T : V, W> ] :
  U extends [ infer V ] ? [ _PAIR<T,V> ] :
  U;
type _VC14<T extends any, U extends any[]> =
  U extends [ infer V, ...infer W ] ? [ _PAIR<T,V>, ..._VC15<V extends PassThroughTask ? T : V, W> ] :
  U extends [ infer V ] ? [ _PAIR<T,V> ] :
  U;
type _VC15<T extends any, U extends any[]> =
  U extends [ infer V, ...infer W ] ? [ _PAIR<T,V>, ..._VC16<V extends PassThroughTask ? T : V, W> ] :
  U extends [ infer V ] ? [ _PAIR<T,V> ] :
  U;
type _VC16<T extends any, U extends any[]> =
  U extends [ infer V, ...infer W ] ? [ _PAIR<T,V>, ..._VC17<V extends PassThroughTask ? T : V, W> ] :
  U extends [ infer V ] ? [ _PAIR<T,V> ] :
  U;
type _VC17<T extends any, U extends any[]> = U;



type _FIRST<U extends any[]> =
  U extends [ infer V, ...infer W ] ? (V extends PassThroughTask ? _FIRST2<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _FIRST2<U extends any[]> =
  U extends [ infer V, ...infer W ] ? (V extends PassThroughTask ? _FIRST3<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _FIRST3<U extends any[]> =
  U extends [ infer V, ...infer W ] ? (V extends PassThroughTask ? _FIRST4<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _FIRST4<U extends any[]> =
  U extends [ infer V, ...infer W ] ? (V extends PassThroughTask ? _FIRST5<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _FIRST5<U extends any[]> =
  U extends [ infer V, ...infer W ] ? (V extends PassThroughTask ? _FIRST6<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _FIRST6<U extends any[]> =
  U extends [ infer V, ...infer W ] ? (V extends PassThroughTask ? _FIRST7<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _FIRST7<U extends any[]> =
  U extends [ infer V, ...infer W ] ? (V extends PassThroughTask ? _FIRST8<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _FIRST8<U extends any[]> =
  U extends [ infer V, ...infer W ] ? (V extends PassThroughTask ? _FIRST9<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _FIRST9<U extends any[]> =
  U extends [ infer V, ...infer W ] ? (V extends PassThroughTask ? _FIRST10<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _FIRST10<U extends any[]> =
  U extends [ infer V, ...infer W ] ? (V extends PassThroughTask ? _FIRST11<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _FIRST11<U extends any[]> =
  U extends [ infer V, ...infer W ] ? (V extends PassThroughTask ? _FIRST12<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _FIRST12<U extends any[]> =
  U extends [ infer V, ...infer W ] ? (V extends PassThroughTask ? _FIRST13<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _FIRST13<U extends any[]> =
  U extends [ infer V, ...infer W ] ? (V extends PassThroughTask ? _FIRST14<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _FIRST14<U extends any[]> =
  U extends [ infer V, ...infer W ] ? (V extends PassThroughTask ? _FIRST15<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _FIRST15<U extends any[]> =
  U extends [ infer V, ...infer W ] ? (V extends PassThroughTask ? _FIRST16<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _FIRST16<U extends any[]> =
  U extends [ infer V, ...infer W ] ? (V extends PassThroughTask ? _FIRST17<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _FIRST17<U extends any[]> = unknown;



type _LAST<U extends any[]> =
  U extends [ ...infer W, infer V ] ? (V extends PassThroughTask ? _LAST2<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _LAST2<U extends any[]> =
  U extends [ ...infer W, infer V ] ? (V extends PassThroughTask ? _LAST3<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _LAST3<U extends any[]> =
  U extends [ ...infer W, infer V ] ? (V extends PassThroughTask ? _LAST4<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _LAST4<U extends any[]> =
  U extends [ ...infer W, infer V ] ? (V extends PassThroughTask ? _LAST5<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _LAST5<U extends any[]> =
  U extends [ ...infer W, infer V ] ? (V extends PassThroughTask ? _LAST6<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _LAST6<U extends any[]> =
  U extends [ ...infer W, infer V ] ? (V extends PassThroughTask ? _LAST7<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _LAST7<U extends any[]> =
  U extends [ ...infer W, infer V ] ? (V extends PassThroughTask ? _LAST8<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _LAST8<U extends any[]> =
  U extends [ ...infer W, infer V ] ? (V extends PassThroughTask ? _LAST9<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _LAST9<U extends any[]> =
  U extends [ ...infer W, infer V ] ? (V extends PassThroughTask ? _LAST10<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _LAST10<U extends any[]> =
  U extends [ ...infer W, infer V ] ? (V extends PassThroughTask ? _LAST11<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _LAST11<U extends any[]> =
  U extends [ ...infer W, infer V ] ? (V extends PassThroughTask ? _LAST12<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _LAST12<U extends any[]> =
  U extends [ ...infer W, infer V ] ? (V extends PassThroughTask ? _LAST13<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _LAST13<U extends any[]> =
  U extends [ ...infer W, infer V ] ? (V extends PassThroughTask ? _LAST14<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _LAST14<U extends any[]> =
  U extends [ ...infer W, infer V ] ? (V extends PassThroughTask ? _LAST15<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _LAST15<U extends any[]> =
  U extends [ ...infer W, infer V ] ? (V extends PassThroughTask ? _LAST16<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _LAST16<U extends any[]> =
  U extends [ ...infer W, infer V ] ? (V extends PassThroughTask ? _LAST17<W> : V) :
  U extends [ infer V ] ? V :
  unknown
;
type _LAST17<U extends any[]> = unknown;


export type SeriesTask = Task;

export type SeriesArgs<T extends SeriesTask[]> = ACC<_FIRST<T>>;

export type SeriesResult<T extends SeriesTask[]> = PR<RET<_LAST<T>>>;

export type SeriesChain<T extends SeriesTask[]> =
  T extends [infer U, ...infer V] ? [U, ..._VC<U , V>] : T
