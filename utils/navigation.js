"use client";

import { useRouter as useNextRouter, usePathname, useSearchParams } from "next/navigation";

// Compatibility wrapper to replace next/router in App Router.
export function useAppRouter() {
  const r = useNextRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams?.entries?.() || []);

  return {
    // navigation
    push: r.push,
    replace: r.replace,
    back: r.back,
    forward: r.forward,
    refresh: r.refresh,
    prefetch: r.prefetch,
    // state
    pathname,
    asPath: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ""),
    query,
  };
}

export { usePathname, useSearchParams } from "next/navigation";

