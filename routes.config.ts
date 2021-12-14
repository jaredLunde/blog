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

export function absoluteUrl(path: string) {
  return new URL(
    path,
    process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://localhost:3000"
  ).href;
}
