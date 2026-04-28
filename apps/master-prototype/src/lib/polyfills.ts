// Polyfill localStorage for server-side rendering
// This prevents errors when libraries try to access localStorage during SSR
if (typeof window === "undefined") {
  // Server-side: create a mock localStorage
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    length: 0,
    key: () => null,
  };
}

// Ensure this file is treated as an ES module so the RSC bundler gets a valid factory
export {};

