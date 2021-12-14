import { useId } from "@radix-ui/react-id";
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

export function RelatedPosts({
  post,
  posts,
  count = 3,
  ...props
}: RelatedPostsProps) {
  const relatedPosts = useRelatedPosts(posts, post);

  return (
    <ul className={vstack({ gap: 500 })} {...props}>
      {relatedPosts.slice(0, count).map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </ul>
  );
}

export interface RelatedPostsProps
  extends React.HTMLAttributes<HTMLUListElement> {
  post: Post;
  posts: Post[];
  count?: number;
}

function BlogPostCard({ post }: BlogPostCardProps) {
  const id = useId();

  return (
    <li className={clsx(postCard())}>
      <article
        className={vstack({ gap: 500, reversed: true })}
        aria-labelledby={id + "-title"}
        aria-describedby={`${id}-desc ${id}-reading-time`}
      >
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
            <h3
              className={text({ size: 400, leading: 400, weight: 400 })}
              id={id + "-title"}
            >
              {post.metadata.title}
            </h3>
            <h4 className={text({ size: 200, leading: 400 })} id={id + "-desc"}>
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

          <div
            className={text({ color: "secondary", weight: 400 })}
            aria-hidden
          >
            Hear me out{" "}
            <span className={text({ color: "text500" })}>
              &middot;{" "}
              <span id={id + "-reading-time"}>
                {post.metadata.readingTime.text}
              </span>
            </span>
          </div>
        </Link>

        <div
          className={clsx(hstack({ gap: 400 }), text({ variant: "caption" }))}
        >
          <components.time>{post.metadata.timestamp}</components.time>{" "}
          <span aria-hidden>&mdash;</span>
          <ul className={hstack({ gap: 400 })} aria-label="Post categories">
            {post.metadata.categories.map((category) => (
              <li key={category}>
                <Link to="category" params={{ category }} rel="category">
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </li>
  );
}

export interface BlogPostCardProps {
  post: Post;
}

const postCard = Object.assign(
  styles.one((t) => ({
    padding: t.pad[500],
    borderRadius: t.radius.primary,
    border: `${t.borderWidth[50]} solid ${t.color.secondary}`,
  })),
  {
    imageContainer: styles.one((t) => ({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      width: "100%",
      maxWidth: "100%",
      height: 296,
      borderRadius: t.radius.primary,

      picture: {
        maxWidth: "none",
        width: "auto",

        img: {
          width: "auto",
          maxWidth: "none",
        },
      },
    })),
    link: styles.one({
      textDecoration: "none",

      "&:focus-visible": {
        textDecoration: "underline",
      },
    }),
  }
);
