import { Task } from './types';
declare type _UWP<T> = T extends Promise<infer U> ? U : T;
declare type _RET<T> = T extends (...args: any) => any ? ReturnType<T> : any;
/**
* ```javascript
    const task = Race(
        async (i) => i + 1,
        async (i) => i + 2,
    );

    const result = await task(1); // 2
* ```
*
* @name Race
* @param {...function} tasks - any number of async tasks
* @returns {function} an async task that resolves or rejects as soon as the first one of its "children" resolves or rejects
* @memberof async-patterns
*/
declare const Race: <T extends Task[]>(...tasks: T) => (...args: any) => Promise<_UWP<_RET<T[number]>>>;
export = Race;
