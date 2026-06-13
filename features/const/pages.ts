// ======== Define pages ========
export type Page = {
  label: string;
  href: string;
  list?: Page[];
};

export const PAGES = {
  landing: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ],
  dashboard: [
    { label: "Dashboard", href: "/dash" },
    { label: "settings", href: "/dash/settings" },
  ],
} as const satisfies Record<string, Page[]>;

// ======== Flatten pages ========
const flatten = (pages: Page[]): Page[] =>
  pages.flatMap((page) => (page.list ? [page, ...flatten(page.list)] : [page]));
const flattened = Object.values(PAGES).flatMap(flatten);
type DeepFlatten<U> = U extends { list: (infer V)[] } ? U | Flatten<V[]> : U;
type Flatten<T> = T extends (infer U)[] ? DeepFlatten<U> : never;
type AllPages = Flatten<(typeof PAGES)[keyof typeof PAGES]>;

// ======== Get page by href ========
export function getPage<H extends AllPages["href"]>(href: H) {
  return flattened.find((page) => page.href === href) as Extract<AllPages, { href: H }>;
}
