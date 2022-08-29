export type OptionalPromise<T> = Promise<T> | T

export type ListItems<T, V = T> = (pre?: V) => OptionalPromise<T[]>;

export type GetItem<T, V = T> = (pre?: V) => OptionalPromise<T>;

export type WriteAction<T, P = any> = (pre?: P) => OptionalPromise<T>;

export type PreAction<T> = () => OptionalPromise<T>;

export type PostAction<T, V> = (item?: T) => OptionalPromise<V>;
