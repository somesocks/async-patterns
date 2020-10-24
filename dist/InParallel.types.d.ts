import { Task, Accepts, Returns, PromiseResult } from './types';
declare type PR<T> = PromiseResult<T>;
declare type RET<T> = Returns<T>;
declare type ACC<T> = Accepts<T, any[]>;
declare type RES_UNBOX<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
    tail: infer V;
} ? [U, ...RES_UNBOX2<V>] : T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
} ? [U] : [
];
declare type RES_UNBOX2<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
    tail: infer V;
} ? [U, ...RES_UNBOX3<V>] : T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
} ? [U] : [
];
declare type RES_UNBOX3<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
    tail: infer V;
} ? [U, ...RES_UNBOX4<V>] : T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
} ? [U] : [
];
declare type RES_UNBOX4<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
    tail: infer V;
} ? [U, ...RES_UNBOX5<V>] : T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
} ? [U] : [
];
declare type RES_UNBOX5<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
    tail: infer V;
} ? [U, ...RES_UNBOX6<V>] : T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
} ? [U] : [
];
declare type RES_UNBOX6<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
    tail: infer V;
} ? [U, ...RES_UNBOX7<V>] : T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
} ? [U] : [
];
declare type RES_UNBOX7<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
    tail: infer V;
} ? [U, ...RES_UNBOX8<V>] : T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
} ? [U] : [
];
declare type RES_UNBOX8<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
    tail: infer V;
} ? [U, ...RES_UNBOX9<V>] : T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
} ? [U] : [
];
declare type RES_UNBOX9<T> = [];
declare type _BUILD_RES<T> = T extends Task ? PR<RET<T>> : never;
declare type _RES<T extends any[]> = T extends [infer HEAD, ...infer TAIL] ? {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: _BUILD_RES<HEAD>;
    tail: _RES<TAIL>;
} : T extends [infer HEAD] ? {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: _BUILD_RES<HEAD>;
} : {
    brand: '5Z7RupztR4SHT30zgDbkfA';
};
declare type RES<T extends any[]> = RES_UNBOX<_RES<T>>;
declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
declare type IfEquals<T, U, Y = unknown, N = never> = (<G>() => G extends T ? 1 : 2) extends (<G>() => G extends U ? 1 : 2) ? Y : N;
declare type BoxedParallelArgs<T extends Task[]> = {
    [P in keyof T]: {
        _box: OrderArg<T[P]>;
    };
}[Exclude<keyof T, keyof any[]>];
declare type OrderArg<T> = T extends Task ? IfEquals<ACC<T>[0], any, unknown, ACC<T>[0]> : unknown;
declare type UnboxIntersection<T> = T extends {
    _box: infer U;
} ? U : never;
export declare type ParallelTask = Task;
export declare type ParallelArgs<T extends ParallelTask[]> = UnboxIntersection<UnionToIntersection<BoxedParallelArgs<T>>>;
export declare type ParallelResult<T extends ParallelTask[]> = PR<RES<T>>;
export {};
