// Polyfills for server-side rendering
if (typeof window === 'undefined') {
  type MutableGlobal = typeof globalThis & { indexedDB?: IDBFactory };
  const globalRef = globalThis as MutableGlobal;

  // Mock indexedDB for SSR
  globalRef.indexedDB = undefined;

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
