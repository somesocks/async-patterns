export declare type Task = (...args: any) => any;
export declare type PromiseResult<T> = T extends Promise<infer U> ? U : T;
export declare type Returns<T, DEFAULT = any> = T extends (...args: any) => any ? ReturnType<T> : DEFAULT;
export declare type Accepts<T, DEFAULT = any> = T extends (...args: any) => any ? Parameters<T> : DEFAULT;
