import clsx from "clsx";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import { slugify, useOrder, useTag } from "proser";
import * as React from "react";
import { PostsList } from "@/components/posts-list";
import { posts, postsMap } from "@/posts";
import { absoluteUrl, routes } from "@/routes.config";
import { box, vstack } from "@/styles/layout";
import { text } from "@/styles/text";

const Tag: NextPage<TagProps> = function ({ tag }) {
  const tagState = useTag(posts, tag);
  const orderedPosts = useOrder(tagState.posts, "desc");
  const formattedTitle =
    tagState.posts[0].metadata.tags.find(
      (current) => slugify(current) === tag
    ) || tag;
  const postWithImage = orderedPosts.find((post) => post.metadata.image);

  return (
    <React.Fragment>
      <NextSeo
        title={`${formattedTitle} articles / Jared Lunde`}
        description={`Dive in to articles tagged "${formattedTitle}". Follow me at @jaredLunde on Twitter for more.`}
        canonical={absoluteUrl(routes.tag({ tag: formattedTitle }))}
        openGraph={{
          images: postWithImage?.metadata.image
            ? [{ url: absoluteUrl(postWithImage.metadata.image) }]
            : [],
        }}
        twitter={{
          cardType: postWithImage?.metadata.image
            ? "summary_large_image"
            : "summary",
        }}
        additionalMetaTags={
          postWithImage?.metadata.image
            ? [
                {
                  name: "twitter:image",
                  content: absoluteUrl(postWithImage.metadata.image),
                },
              ]
            : []
        }
      />

      <div
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
      </div>
    </React.Fragment>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Object.keys(postsMap).flatMap((slug) =>
      postsMap[slug].metadata.tags.map((tag) => routes.tag({ tag }))
    ),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<TagProps> = async ({ params }) => {
  if (!params || !params.tag || Array.isArray(params.tag)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      tag: params.tag,
    },
  };
};

export interface TagProps {
  tag: string;
}

export default Tag;
