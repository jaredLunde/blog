import clsx from "clsx";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import { slugify, useCategory, useOrder } from "proser";
import * as React from "react";
import { PostsList } from "@/components/posts-list";
import { posts, postsMap } from "@/posts";
import { routes } from "@/routes.config";
import { box, vstack } from "@/styles/layout";
import { text } from "@/styles/text";

const Category: NextPage<CategoryProps> = function ({ category }) {
  const categoryState = useCategory(posts, category);
  const orderedPosts = useOrder(categoryState.posts, "desc");
  const formattedTitle =
    categoryState.posts[0].metadata.categories.find(
      (current) => slugify(current) === category
    ) || category;
  const postWithImage = orderedPosts.find((post) => post.metadata.image);

  return (
    <React.Fragment>
      <NextSeo
        title={`${formattedTitle} articles / Jared Lunde`}
        description={`Dive in to my "${formattedTitle}" articles. Follow me at @jaredLunde on Twitter for more.`}
        canonical={routes.category({ category: formattedTitle })}
        openGraph={{
          images: postWithImage?.metadata.image
            ? [{ url: postWithImage.metadata.image }]
            : [],
        }}
      />

      <section
        className={vstack({
          width: { min: "100%", sm: "72ch" },
          minHeight: "100%",
          border: [["none", 50], "border"],
        })}
        style={{ marginLeft: "auto", marginRight: "auto" }}
      >
        <h2
          className={clsx(
            box({
              pad: { min: [500, 500, "none"], sm: [600, 600, "none"] },
            }),
            text({ size: 600, weight: 400 })
          )}
        >
          {formattedTitle}
        </h2>
        <PostsList posts={orderedPosts} />
      </section>
    </React.Fragment>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Object.keys(postsMap).flatMap((slug) =>
      postsMap[slug].metadata.categories.map((category) =>
        routes.category({ category })
      )
    ),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<CategoryProps> = async ({
  params,
}) => {
  if (!params || !params.category || Array.isArray(params.category)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      category: params.category,
    },
  };
};

export interface CategoryProps {
  category: string;
}

export default Category;
