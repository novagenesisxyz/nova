// Polyfills for server-side rendering
if (typeof window === 'undefined') {
  type MutableGlobal = typeof globalThis & { indexedDB?: IDBFactory };
  const globalRef = globalThis as MutableGlobal;

  const noop = () => undefined;
  const createRequest = () =>
    ({
      addEventListener: noop,
      removeEventListener: noop,
      dispatchEvent: () => false,
      onerror: null,
      onsuccess: null,
      onupgradeneeded: null,
      onblocked: null,
      readyState: 'done',
      result: undefined,
      error: null,
      source: null,
      transaction: null,
    }) as unknown as IDBOpenDBRequest;

  const openStub: IDBFactory['open'] = () => createRequest();
  const deleteStub: IDBFactory['deleteDatabase'] = () => createRequest();
  const databasesStub: NonNullable<IDBFactory['databases']> = async () => [];

  // Mock indexedDB for SSR
  globalRef.indexedDB = {
    open: openStub,
    deleteDatabase: deleteStub,
    cmp: () => 0,
    databases: databasesStub,
  };

  // Mock other browser-specific APIs if needed
  globalRef.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    length: 0,
    key: () => null,
  } as Storage;

  globalRef.sessionStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    length: 0,
    key: () => null,
  } as Storage;
}

export {};
