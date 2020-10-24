import { Task, Accepts } from './types';
declare type ACC<T> = Accepts<T, any[]>;
declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
declare type IfEquals<T, U, Y = unknown, N = never> = (<G>() => G extends T ? 1 : 2) extends (<G>() => G extends U ? 1 : 2) ? Y : N;
declare type BoxedOrderArgs<T extends Task[]> = {
    [P in keyof T]: {
        _box: OrderArg<T[P]>;
    };
}[Exclude<keyof T, keyof any[]>];
declare type OrderArg<T> = T extends Task ? IfEquals<ACC<T>[0], any, unknown, ACC<T>[0]> : unknown;
declare type UnboxIntersection<T> = T extends {
    _box: infer U;
} ? U : never;
export declare type OrderTask = Task;
export declare type OrderArgs<T extends OrderTask[]> = UnboxIntersection<UnionToIntersection<BoxedOrderArgs<T>>>;
export declare type OrderResult<T extends OrderTask[]> = OrderArgs<T>;
export {};
