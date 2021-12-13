import { URL } from "iso-url";
import { slugify } from "proser";
import { reduce } from "@/utils/obj";

export const routes = {
  home() {
    return "/";
  },

  resume() {
    return "/resume";
  },

  category({ category }: { category: string }) {
    return `/posts/${slugify(category)}`;
  },

  tag({ tag }: { tag: string }) {
    return `/posts/tagged/${slugify(tag)}`;
  },

  post({ category, slug }: { category: string; slug: string }) {
    return `/posts/${slugify(category)}/${slug}`;
  },
};

export const absRoutes = reduce(
  routes,
  (acc, key) => {
    acc[key] = (...args: any[]) =>
      new URL(
        // @ts-expect-error: this is fine
        routes[key](...args),
        process.env.NEXT_PUBLIC_VERCEL_URL ?? "http://localhost:3000"
      ).href;
    return acc;
  },
  {} as typeof routes
);
