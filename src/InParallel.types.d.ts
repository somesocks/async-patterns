
import { Task, First, Last, AsyncReturnType, TypedAsyncTask } from './types';

// type _UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type _UWP<T> = T extends Promise<infer U> ? U : T;

// type _Returns<T> = T extends (...args : any) => any ? ReturnType<T> : never;
type _RET<T> = T extends (...args : any) => any ? ReturnType<T> : never;
type _ACC<T> = T extends (...args : any) => any ? Parameters<T> : never;

// this is an ugly hack to get around the recursive type limitation in TS
// type _verifyChain<T extends any, U extends any[]> =
type _VC<T extends any, U extends any[]> =
  U extends [ infer V , ...infer W ] ? [ (...args : _ACC<T>) => any, ..._VC2<V, W> ] :
  U extends [ infer V ] ? [ (...args : _ACC<T>) => any ] :
  U;
type _VC2<T extends any, U extends any[]> =
  U extends [ infer V , ...infer W ] ? [ (...args : _ACC<T>) => any, ..._VC3<V, W> ] :
  U extends [ infer V ] ? [ (...args : _ACC<T>) => any ] :
  U;
type _VC3<T extends any, U extends any[]> =
  U extends [ infer V , ...infer W ] ? [ (...args : _ACC<T>) => any, ..._VC4<V, W> ] :
  U extends [ infer V ] ? [ (...args : _ACC<T>) => any ] :
  U;
type _VC4<T extends any, U extends any[]> =
  U extends [ infer V , ...infer W ] ? [ (...args : _ACC<T>) => any, ..._VC5<V, W> ] :
  U extends [ infer V ] ? [ (...args : _ACC<T>) => any ] :
  U;
type _VC5<T extends any, U extends any[]> =
  U extends [ infer V , ...infer W ] ? [ (...args : _ACC<T>) => any, ..._VC6<V, W> ] :
  U extends [ infer V ] ? [ (...args : _ACC<T>) => any ] :
  U;
type _VC6<T extends any, U extends any[]> =
  U extends [ infer V , ...infer W ] ? [ (...args : _ACC<T>) => any, ..._VC7<V, W> ] :
  U extends [ infer V ] ? [ (...args : _ACC<T>) => any ] :
  U;
type _VC7<T extends any, U extends any[]> =
  U extends [ infer V , ...infer W ] ? [ (...args : _ACC<T>) => any, ..._VC8<V, W> ] :
  U extends [ infer V ] ? [ (...args : _ACC<T>) => any ] :
  U;
type _VC8<T extends any, U extends any[]> =
  U extends [ infer V , ...infer W ] ? [ (...args : _ACC<T>) => any, ..._VC9<V, W> ] :
  U extends [ infer V ] ? [ (...args : _ACC<T>) => any ] :
  U;
type _VC9<T extends any, U extends any[]> =
  U extends [ infer V , ...infer W ] ? [ (...args : _ACC<T>) => any, ..._VC10<V, W> ] :
  U extends [ infer V ] ? [ (...args : _ACC<T>) => any ] :
  U;
type _VC10<T extends any, U extends any[]> =
  U extends [ infer V , ...infer W ] ? [ (...args : _ACC<T>) => any, ..._VC11<V, W> ] :
  U extends [ infer V ] ? [ (...args : _ACC<T>) => any ] :
  U;
type _VC11<T extends any, U extends any[]> =
  U extends [ infer V , ...infer W ] ? [ (...args : _ACC<T>) => any, ..._VC12<V, W> ] :
  U extends [ infer V ] ? [ (...args : _ACC<T>) => any ] :
  U;
type _VC12<T extends any, U extends any[]> =
  U extends [ infer V , ...infer W ] ? [ (...args : _ACC<T>) => any, ..._VC13<V, W> ] :
  U extends [ infer V ] ? [ (...args : _ACC<T>) => any ] :
  U;
type _VC13<T extends any, U extends any[]> =
  U extends [ infer V , ...infer W ] ? [ (...args : _ACC<T>) => any, ..._VC14<V, W> ] :
  U extends [ infer V ] ? [ (...args : _ACC<T>) => any ] :
  U;
type _VC14<T extends any, U extends any[]> =
  U extends [ infer V , ...infer W ] ? [ (...args : _ACC<T>) => any, ..._VC15<V, W> ] :
  U extends [ infer V ] ? [ (...args : _ACC<T>) => any ] :
  U;
type _VC15<T extends any, U extends any[]> =
  U extends [ infer V , ...infer W ] ? [ (...args : _ACC<T>) => any, ..._VC16<V, W> ] :
  U extends [ infer V ] ? [ (...args : _ACC<T>) => any ] :
  U;
type _VC16<T extends any, U extends any[]> =
  U extends [ infer V , ...infer W ] ? [ (...args : _ACC<T>) => any, ..._VC17<V, W> ] :
  U extends [ infer V ] ? [ (...args : _ACC<T>) => any ] :
  U;
type _VC17<T extends any, U extends any[]> = U;

export type ParallelTask = Task;

export type ParallelArgs<T extends ParallelTask[]> = Parameters<First<T>>;

export type ParallelResult<T extends ParallelTask[]> = { [U in keyof T]: _UWP<_RET<T[U]>> };

export type ParallelChain<T extends ParallelTask[]> =
  T extends [infer U, ...infer V] ? [U, ..._VC<U, V>] : T
