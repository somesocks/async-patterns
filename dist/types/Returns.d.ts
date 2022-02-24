declare type Returns<T, DEFAULT = any> = T extends (...args: any) => any ? ReturnType<T> : DEFAULT;
export default Returns;
