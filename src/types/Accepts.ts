
type Accepts<T, DEFAULT = any> = T extends (...args : any) => any ? Parameters<T> : DEFAULT;

export default Accepts;