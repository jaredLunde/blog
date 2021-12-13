import { slugify } from "proser";

export const routes = {
  home() {
    return "/" as const;
  },

  resume() {
    return "/resume" as const;
  },

  category({ category }: { category: string }) {
    return `/posts/${slugify(category)}` as const;
  },

  tag({ tag }: { tag: string }) {
    return `/posts/tagged/${slugify(tag)}` as const;
  },

  post({ category, slug }: { category: string; slug: string }) {
    return `/posts/${slugify(category)}/${slug}` as const;
  },
};
