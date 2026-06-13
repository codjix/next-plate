"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const CookieCtx = createContext("");

type $CookieManager = { children?: React.ReactNode; value?: string };
export const CookieManager = ({ children, value = "" }: $CookieManager) => (
  <CookieCtx {...{ value, children }} />
);

const store = {
  sync: new Set<(name: string, value: unknown) => void>(),
  read(name: string, cookie: string) {
    const src = typeof document === "undefined" ? cookie : document.cookie;
    const raw = src.split("; ").find((c) => c.startsWith(`${name}=`));
    if (raw) return decodeURIComponent(raw.slice(name.length + 1));
  },
  write(name: string, value: string) {
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
    // biome-ignore lint/suspicious/noDocumentCookie: this is the cookie store itself
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${expires}`;
  },
};

export function useCookieState<T = string>(name: string): [T | undefined, (value: T) => void];
export function useCookieState<T = string>(name: string, init: T): [T, (value: T) => void];
export function useCookieState<T = string>(name: string, init?: T) {
  const cookie = useContext(CookieCtx);
  const [state, update] = useState<T | undefined>(() => {
    const value = store.read(name, cookie);
    if (value === undefined) return init;
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as T;
    }
  });

  useEffect(() => {
    const listener = (n: string, value: unknown) => (n === name ? update(value as T) : undefined);
    store.sync.add(listener);
    return () => void store.sync.delete(listener);
  }, [name]);

  const setState = useCallback(
    (value: T) => {
      store.write(name, typeof value === "object" ? JSON.stringify(value) : String(value));
      for (const listener of store.sync) listener(name, value);
    },
    [name],
  );

  return [state, setState];
}
