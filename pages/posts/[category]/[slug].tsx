import { MDXProvider } from "@mdx-js/react";
import clsx from "clsx";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import * as React from "react";
import { Link } from "@/components/link";
import { RelatedPosts } from "@/components/related-posts";
import { mq, styles } from "@/dash.config";
import { Post, posts, postsMap } from "@/posts";
import * as postComponents from "@/posts/components";
import { routes } from "@/routes.config";
import { divider } from "@/styles/divider";
import { bleed, box, grid, hstack, inline, vstack } from "@/styles/layout";
import { prose } from "@/styles/prose";
import { text } from "@/styles/text";

const Post: NextPage<PostProps> = function ({ slug }) {
  const post = postsMap[slug];

  return (
    <article
      className={vstack({
        gap: 500,
        width: { min: "100%", sm: "72ch" },
        minHeight: "100%",
        border: [["none", 50], "border"],
      })}
      style={{ marginLeft: "auto", marginRight: "auto" }}
    >
      <NextSeo
        title={`${post.metadata.title} / Jared Lunde`}
        description={
          typeof post.metadata.description === "string"
            ? post.metadata.description
            : ""
        }
        canonical={routes.post({
          category: post.metadata.categories[0],
          slug: post.slug,
        })}
        openGraph={{
          images: post.metadata.image ? [{ url: post.metadata.image }] : [],
        }}
      />

      <div
        className={vstack({
          gap: 500,
          pad: { min: [500, 500, "none"], sm: [600, 600, "none"] },
        })}
      >
        <div
          className={clsx(
            hstack({ gap: 400 }),
            text({ color: "text400", variant: "caption" })
          )}
        >
          <postComponents.time>{post.metadata.timestamp}</postComponents.time>{" "}
          <span aria-hidden>&mdash;</span>
          <span className={hstack({ gap: 400 })}>
            {post.metadata.categories.map((category) => (
              <Link
                key={category}
                to="category"
                params={{ category }}
                rel="category"
              >
                {category}
              </Link>
            ))}
          </span>
        </div>

        <div className={vstack({ gap: 500 })}>
          <h1 className={text({ weight: 400, size: 500, color: "text" })}>
            {post.metadata.title}
          </h1>

          <h2
            className={text({
              weight: 300,
              size: 300,
              leading: 300,
              color: "text",
            })}
          >
            {post.metadata.description}
          </h2>
        </div>
      </div>

      <div
        className={vstack({
          gap: { min: 500, sm: 600 },
          pad: { min: ["none", 500, 500], sm: ["none", 600, 600] },
        })}
      >
        <MDXProvider components={postComponents}>
          <div className={prose()}>
            <React.Suspense fallback={null}>
              <post.component />
            </React.Suspense>
          </div>
        </MDXProvider>

        <section
          className={clsx(
            inline({ gap: 300 }),
            bleed({ amount: ["em300"] }),
            tags()
          )}
        >
          {post.metadata.tags.map((tag) => (
            <Link key={tag} to="tag" params={{ tag }} rel="tag">
              {tag}
            </Link>
          ))}
        </section>

        <div className={divider()} />

        <section
          className={grid({
            cols: ["min-content", "auto"],
            gap: 500,
            alignY: { min: "stretch", sm: "center" },
          })}
        >
          <div
            className={box({
              pad: ["none", 500, "none", "none"],
              border: [["none", 50, "none", "none"], "border"],
            })}
            style={{ whiteSpace: "pre" }}
          >
            <div className={text({ variant: "caption" })}>Written by</div>
            <div className="author">Jared Lunde</div>
          </div>
          <p className={text({ color: "text400", size: 200 })}>
            <span role="img" aria-label="Peace sign emoji">
              ✌️
            </span>{" "}
            I&apos;m just building the things that make me curious
          </p>
        </section>
      </div>

      <div className={divider()} />

      <section
        className={vstack({
          gap: 500,
          pad: { min: [400, 500, 500], sm: [400, 600, 600] },
        })}
      >
        <h2
          className={text({
            weight: 400,
            size: 400,
            leading: 300,
            color: "text",
          })}
        >
          Recommended for you
        </h2>

        <RelatedPosts post={post} posts={posts} />
      </section>
    </article>
  );
};

const tags = styles.one(
  mq({
    default: (t) => ({
      "> a": {
        color: t.color.secondary,
        backgroundColor: t.iconButton.color.primary.bg,
        fontWeight: "bold",
        fontSize: 11 / 16 + "rem",
        borderRadius: t.radius.primary,
        padding: `${t.pad.em200} ${t.pad.em400}`,
        textDecoration: "none",
        textTransform: "uppercase",
      },

      "> a:focus-visible": {
        color: t.iconButton.color.primary.hoverText,
        backgroundColor: t.iconButton.color.primary.hoverBg,
        textDecoration: "none!important",
      },
    }),
    hover: (t) => ({
      "> a:hover": {
        color: t.iconButton.color.primary.hoverText,
        backgroundColor: t.iconButton.color.primary.hoverBg,
        textDecoration: "none!important",
      },
    }),
  })
);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Object.keys(postsMap).map((slug) =>
      routes.post({ category: postsMap[slug].metadata.categories[0], slug })
    ),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  if (!params || !params.slug || Array.isArray(params.slug)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      slug: params.slug,
    },
  };
};

export interface PostProps {
  slug: Post["slug"];
}

export default Post;
