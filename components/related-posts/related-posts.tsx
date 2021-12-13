import clsx from "clsx";
import Image from "next/image";
import { useRelatedPosts } from "proser";
import React from "react";
import { Link } from "@/components/link";
import { styles } from "@/dash.config";
import type { Post } from "@/posts";
import * as components from "@/posts/components";
import { box, hstack, vstack } from "@/styles/layout";
import { text } from "@/styles/text";

export function RelatedPosts({ post, posts, count = 3 }: RelatedPostsProps) {
  const relatedPosts = useRelatedPosts(posts, post);

  return (
    <aside className={vstack({ gap: 500 })}>
      {relatedPosts.slice(0, count).map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </aside>
  );
}

export interface RelatedPostsProps {
  post: Post;
  posts: Post[];
  count?: number;
}

function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <section className={clsx(postCard(), vstack({ gap: 500 }))}>
      <div className={clsx(hstack({ gap: 400 }), text({ variant: "caption" }))}>
        <components.time>{post.metadata.timestamp}</components.time>{" "}
        <span aria-hidden>&mdash;</span>
        <span className={hstack({ gap: 400 })}>
          {post.metadata.categories.map((category) => (
            <React.Fragment key={category}>
              <Link to="category" params={{ category }} rel="category">
                {category}
              </Link>
            </React.Fragment>
          ))}
        </span>
      </div>

      <Link
        to="post"
        params={{ category: post.metadata.categories[0], slug: post.slug }}
        className={clsx(
          postCard.link(),
          vstack({ gap: 500 }),
          text({ color: "text500" })
        )}
      >
        <div>
          <h3 className={text({ size: 400, leading: 400, weight: 400 })}>
            {post.metadata.title}
          </h3>
          <h4 className={text({ size: 200, leading: 400 })}>
            {post.metadata.description}
          </h4>
        </div>

        {post.metadata.image && (
          <div className={postCard.imageContainer()}>
            <Image
              src={post.metadata.image}
              alt={`A photo for the "${post.metadata.title}" post`}
              layout="fill"
              objectFit="cover"
              className={box({ radius: "primary" })}
            />
          </div>
        )}

        <div className={text({ color: "secondary", weight: 400 })}>
          Hear me out{" "}
          <span className={text({ color: "text500" })}>
            &middot; {post.metadata.readingTime.text}
          </span>
        </div>
      </Link>
    </section>
  );
}

export interface BlogPostCardProps {
  post: Post;
}

const postCard = Object.assign(
  styles.one(({ radius, borderWidth, color, pad }) => ({
    padding: pad[500],
    borderRadius: radius.primary,
    border: `${borderWidth[50]} solid ${color.secondary}`,
  })),
  {
    imageContainer: styles.one(({ radius }) => ({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      width: "100%",
      maxWidth: "100%",
      height: 296,
      borderRadius: radius.primary,

      picture: {
        maxWidth: "none",
        width: "auto",

        img: {
          width: "auto",
          maxWidth: "none",
        },
      },
    })),
    link: styles.one((t) => ({
      textDecoration: "none",

      "&:focus-visible": {
        textDecoration: "underline",
      },
    })),
  }
);
