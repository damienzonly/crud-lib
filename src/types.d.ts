export type OptionalPromise<T> = Promise<T> | T

export type ListItems<T, V = T> = (pre?: V) => OptionalPromise<T[]>;

export type GetItem<T, V = T> = (pre?: V) => OptionalPromise<T>;

export type WriteAction<T, V = any> = (pre?: V) => OptionalPromise<T>;

export type PreAction<T = any> = () => OptionalPromise<T>;

export type PostAction<T, V = T> = (item?: V) => OptionalPromise<T>;
