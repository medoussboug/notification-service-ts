import { AsyncLocalStorage } from 'async_hooks';

const asyncLocalStorage = new AsyncLocalStorage<Map<string, any>>();

export class CorrelationContext {
    static run(fn: () => void, correlationID: string) {
        const store = new Map<string, any>();
        store.set('correlationID', correlationID);
        asyncLocalStorage.run(store, fn);
    }

    static getCorrelationID(): string | undefined {
        const store = asyncLocalStorage.getStore();
        return store?.get('correlationID');
    }
}
