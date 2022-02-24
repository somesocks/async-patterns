import Task from './types/Task';
import PromiseResult from './types/PromiseResult';
import Accepts from './types/Accepts';
import Returns from './types/Returns';
import { PassThroughTask } from './PassThrough.types';
declare type PR<T> = PromiseResult<T>;
declare type RET<T> = Returns<T>;
declare type ACC<T> = Accepts<T>;
declare type VC_UNBOX<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
    tail: infer V;
} ? [U, ...VC_UNBOX2<V>] : T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
} ? [U] : [
];
declare type VC_UNBOX2<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
    tail: infer V;
} ? [U, ...VC_UNBOX3<V>] : T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
} ? [U] : [
];
declare type VC_UNBOX3<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
    tail: infer V;
} ? [U, ...VC_UNBOX4<V>] : T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
} ? [U] : [
];
declare type VC_UNBOX4<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
    tail: infer V;
} ? [U, ...VC_UNBOX5<V>] : T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
} ? [U] : [
];
declare type VC_UNBOX5<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
    tail: infer V;
} ? [U, ...VC_UNBOX6<V>] : T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
} ? [U] : [
];
declare type VC_UNBOX6<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
    tail: infer V;
} ? [U, ...VC_UNBOX7<V>] : T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
} ? [U] : [
];
declare type VC_UNBOX7<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
    tail: infer V;
} ? [U, ...VC_UNBOX8<V>] : T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
} ? [U] : [
];
declare type VC_UNBOX8<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
    tail: infer V;
} ? [U, ...VC_UNBOX9<V>] : T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: infer U;
} ? [U] : [
];
declare type VC_UNBOX9<T> = [];
declare type _PAIR<T, V> = T extends PassThroughTask ? V : (arg: PR<RET<T>>) => RET<V>;
declare type _VC<T extends any, U extends any[]> = U extends [infer V, ...infer W] ? {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: _PAIR<T, V>;
    tail: _VC<V extends PassThroughTask ? T : V, W>;
} : U extends [infer V] ? {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    head: _PAIR<T, V>;
} : {
    brand: '5Z7RupztR4SHT30zgDbkfA';
};
declare type VC<T extends any, U extends any[]> = VC_UNBOX<_VC<T, U>>;
declare type UNBOX<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    box: infer U;
} ? UNBOX2<U> : T;
declare type UNBOX2<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    box: infer U;
} ? UNBOX3<U> : T;
declare type UNBOX3<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    box: infer U;
} ? UNBOX4<U> : T;
declare type UNBOX4<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    box: infer U;
} ? UNBOX5<U> : T;
declare type UNBOX5<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    box: infer U;
} ? UNBOX6<U> : T;
declare type UNBOX6<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    box: infer U;
} ? UNBOX7<U> : T;
declare type UNBOX7<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    box: infer U;
} ? UNBOX8<U> : T;
declare type UNBOX8<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    box: infer U;
} ? UNBOX9<U> : T;
declare type UNBOX9<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    box: infer U;
} ? UNBOX10<U> : T;
declare type UNBOX10<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    box: infer U;
} ? UNBOX11<U> : T;
declare type UNBOX11<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    box: infer U;
} ? UNBOX12<U> : T;
declare type UNBOX12<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    box: infer U;
} ? UNBOX13<U> : T;
declare type UNBOX13<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    box: infer U;
} ? UNBOX14<U> : T;
declare type UNBOX14<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    box: infer U;
} ? UNBOX15<U> : T;
declare type UNBOX15<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    box: infer U;
} ? UNBOX16<U> : T;
declare type UNBOX16<T> = T extends {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    box: infer U;
} ? UNBOX17<U> : T;
declare type UNBOX17<T> = unknown;
declare type _LAST<U extends any[]> = U extends [...infer W, infer V] ? (V extends PassThroughTask ? {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    box: _LAST<W>;
} : V) : U extends [infer V] ? V : unknown;
declare type LAST<T extends any[]> = UNBOX<_LAST<T>>;
declare type __FIRST<U extends any[]> = U extends [infer V, ...infer W] ? (V extends PassThroughTask ? {
    brand: '5Z7RupztR4SHT30zgDbkfA';
    box: __FIRST<W>;
} : V) : U extends [infer V] ? V : unknown;
declare type FIRST<T extends any[]> = UNBOX<__FIRST<T>>;
export declare type SeriesTask = Task;
export declare type SeriesArgs<T extends SeriesTask[]> = ACC<FIRST<T>>;
export declare type SeriesResult<T extends SeriesTask[]> = PR<RET<LAST<T>>>;
export declare type SeriesChain<T extends SeriesTask[]> = T extends [infer U, ...infer V] ? [U, ...VC<U, V>] : T;
export {};
