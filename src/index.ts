import { GetItem, ListItems, PostAction, PreAction, WriteAction } from "./types";

export interface Actions<T, V = T> {
    post?: PostAction<T, V>;
    pre?: PreAction<T>
}

export async function actionCall<T extends CallableFunction, V, R = V>(callbacks: {action: T } & Actions<V, R>) {
    const pre = await callbacks?.pre?.();
    const item = await callbacks.action(pre);
    const post = await callbacks?.post?.(item);
    return (post || item) as R
}

export function getter<T, V = T>(callbacks: {action: GetItem<T, V>} & Actions<T, V>) {
    return actionCall<GetItem<T, V>, T, V>({
        pre: callbacks.pre,
        post: callbacks.post,
        action: callbacks.action
    })
}

export async function list<T, V = T>(callbacks: { list: ListItems<T, V>} & Actions<T, V>) {
    return actionCall<ListItems<T, V>, T, V[]>({
        pre: callbacks.pre,
        action: async () => {
            let items = await callbacks.list();
            return Promise.all(items.map(async item => (await callbacks?.post?.(item as any as V)) || item));
        }
    } as any)
}

export async function writeAction<T, V = T>(callbacks: { action: WriteAction<T, V>} & Actions<T, V>) {
    return actionCall<WriteAction<T, V>, T, V>({
        pre: callbacks.pre,
        post: callbacks.post,
        action: callbacks.action
    });
}
