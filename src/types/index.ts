
export type Task = (...args : any) => any;

export type PromiseResult<T> = T extends Promise<infer U> ? U : T;

export type Returns<T, DEFAULT = any> = T extends (...args : any) => any ? ReturnType<T> : DEFAULT;

export type Accepts<T, DEFAULT = any> = T extends (...args : any) => any ? Parameters<T> : DEFAULT;
