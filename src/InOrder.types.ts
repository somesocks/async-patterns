
import { Task, Accepts, Returns, PromiseResult } from './types';

import { PassThroughTask } from './PassThrough.types';

type PR<T> = PromiseResult<T>;
type RET<T> = Returns<T>;
type ACC<T> = Accepts<T, any[]>;

type UnionToIntersection<U> = (U extends any ? (k : U) => void : never) extends ((k : infer I) => void) ? I : never;

type IfEquals<T, U, Y=unknown, N=never> =
  (<G>() => G extends T ? 1 : 2) extends
  (<G>() => G extends U ? 1 : 2) ? Y : N;

type BoxedOrderArgs<T extends Task[]> = {
  [P in keyof T] : { _box : OrderArg<T[P]> }
} [Exclude<keyof T, keyof any[]>];

type OrderArg<T> =
  T extends Task ? IfEquals<ACC<T>[0], any, unknown, ACC<T>[0]> : unknown;

type UnboxIntersection<T> = T extends { _box : infer U } ? U : never;

export type OrderTask = Task;


export type OrderArgs<T extends OrderTask[]> = UnboxIntersection<UnionToIntersection<BoxedOrderArgs<T>>>;

export type OrderResult<T extends OrderTask[]> = PR<OrderArgs<T>>;
