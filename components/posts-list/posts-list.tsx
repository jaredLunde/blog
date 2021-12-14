import { useId } from "@radix-ui/react-id";
import clsx from "clsx";
import { DynamicList, useScroller, useSize } from "mini-virtual-list";
import type { DynamicListRenderProps } from "mini-virtual-list";
import Image from "next/image";
import * as React from "react";
import { Link } from "@/components/link";
import { styles } from "@/dash.config";
import { useOffset } from "@/hooks/use-offset";
import { Post } from "@/posts";
import * as postComponents from "@/posts/components";
import { divider } from "@/styles/divider";
import { hstack, vstack } from "@/styles/layout";
import { text } from "@/styles/text";

export function PostsList({ posts }: { posts: Post[] }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const size = useSize(ref);
  const offset = useOffset(ref, [size.width]);
  const scroll = useScroller(typeof window !== "undefined" ? window : null, {
    offset,
    fps: 30,
  });
  const PostMemo = React.useCallback(
    (props: DynamicListRenderProps<Post>) => (
      <Post {...props} numPosts={posts.length} />
    ),
    [posts.length]
  );

  return (
    <div ref={ref}>
      <DynamicList
        key={posts.length}
        items={posts}
        itemHeightEstimate={162}
        overscanBy={12}
        width={size.width || 1280}
        height={size.height || 720}
        {...scroll}
        render={PostMemo}
      />
    </div>
  );
}

function Post({ data: post, measure, width, index, numPosts }: PostProps) {
  const id = useId();
  React.useEffect(measure, [measure, width, post.id]);

  return (
    <React.Fragment>
      <article
        className={clsx(
          vstack({
            gap: 500,
            pad: { min: 500, sm: 600 },
            reversed: true,
          })
        )}
        aria-labelledby={id + "-title"}
        aria-describedby={`${id}-desc ${id}-reading-time`}
      >
        <Link
          to="post"
          params={{ category: post.metadata.categories[0], slug: post.slug }}
          className={clsx(vstack({ gap: 500 }), postCard.link())}
        >
          <div className={vstack({ gap: 400 })}>
            <h3
              className={text({ weight: 400, size: 400, color: "text" })}
              id={id + "-title"}
            >
              {post.metadata.title}
            </h3>
            <p id={id + "-desc"}>{post.metadata.description}</p>
          </div>

          {post.metadata.image && (
            <div className={postCard.imgContainer()}>
              <Image
                src={post.metadata.image}
                alt={`A photo for the "${post.metadata.title}" post`}
                layout="fill"
                objectFit="cover"
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
          className={clsx(
            hstack({ gap: 400 }),
            text({ color: "text400", variant: "caption" })
          )}
        >
          <postComponents.time>{post.metadata.timestamp}</postComponents.time>{" "}
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

      {index < numPosts - 1 && <div className={divider()} />}
    </React.Fragment>
  );
}

export interface PostProps extends DynamicListRenderProps<Post> {
  numPosts: number;
}

const postCard = {
  imgContainer: styles.one((t) => ({
    width: "100%",
    height: 296,
    img: {
      borderRadius: t.radius.primary,
    },
  })),
  link: styles.one({
    color: "currentColor",
    textDecoration: "none",
    "&:focus-visible": {
      textDecoration: "underline",
    },
  }),
};
