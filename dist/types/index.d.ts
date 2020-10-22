export declare type Task = (...args: any) => any;
export declare type AsyncReturnType<T extends Task> = ReturnType<T> extends Promise<infer U> ? U : ReturnType<T>;
export declare type First<T> = T extends [infer U, ...infer V] ? U : (T extends (infer W)[] ? W : never);
export declare type Rest<T> = T extends [infer U, ...infer V] ? V[] : (T extends (infer W)[] ? W[] : never);
export declare type Last<T> = T extends [...infer U, infer V] ? V : (T extends (infer W)[] ? W : never);
export declare type TypedAsyncTask<IN extends any[], OUT extends any> = (...args: IN) => Promise<OUT>;
