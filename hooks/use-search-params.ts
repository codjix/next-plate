"use client";
import { useRouter, useSearchParams as useSearch } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function useSearchParams(name: string): [string | undefined, (value: string) => void];
export function useSearchParams(name: string, init: string): [string, (value: string) => void];
export function useSearchParams(name: string, init?: string) {
  const router = useRouter();
  const search = useSearch();
  const [state, update] = useState(search.get(name) ?? init);

  useEffect(() => {
    const value = search.get(name) ?? undefined;
    if (value !== state) update(value);
  }, [search, name, state]);

  const setState = useCallback(
    (val: string) => {
      const params = new URLSearchParams(search.toString());
      params.set(name, val);
      router.push(`?${params.toString()}`);
    },
    [router, search, name],
  );

  return [state, setState];
}
