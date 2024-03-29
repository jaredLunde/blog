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
import { absoluteUrl, routes } from "@/routes.config";
import { divider } from "@/styles/divider";
import { bleed, box, grid, inline, vstack } from "@/styles/layout";
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
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      <NextSeo
        title={`${post.metadata.title} / Jared Lunde`}
        description={
          typeof post.metadata.description === "string"
            ? post.metadata.description
            : ""
        }
        canonical={absoluteUrl(
          routes.post({
            category: post.metadata.categories[0],
            slug: post.slug,
          })
        )}
        openGraph={{
          images: post.metadata.image
            ? [{ url: absoluteUrl(post.metadata.image) }]
            : [],
          type: "article",
          article: {
            publishedTime: new Date(post.metadata.timestamp).toISOString(),
            authors: ["Jared Lunde"],
            tags: [...post.metadata.categories, ...post.metadata.tags],
          },
        }}
        twitter={{
          cardType: post.metadata.image ? "summary_large_image" : "summary",
        }}
        additionalMetaTags={
          post.metadata.image
            ? [
                {
                  name: "twitter:image",
                  content: absoluteUrl(post.metadata.image),
                },
              ]
            : []
        }
      />

      <div
        className={vstack({
          gap: 500,
          pad: { min: [500, 500, "none"], sm: [600, 600, "none"] },
        })}
      >
        <meta
          itemProp="datePublished"
          content={new Date(post.metadata.timestamp).toISOString()}
        />
        <meta
          itemProp="wordCount"
          content={"" + post.metadata.readingTime.words}
        />

        <div
          role="complementary"
          aria-label="Post categories and publish date"
          className={clsx(
            inline({ gap: 400 }),
            text({ color: "text400", variant: "caption" })
          )}
        >
          <div>
            <postComponents.time>{post.metadata.timestamp}</postComponents.time>{" "}
            <span aria-hidden>&middot;</span> {post.metadata.readingTime.text}
          </div>

          <span aria-hidden>&mdash;</span>
          <ul className={inline({ gap: 400 })} aria-label="Post categories">
            {post.metadata.categories.map((category) => (
              <li key={category}>
                <Link to="category" params={{ category }} rel="category">
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={vstack({ gap: 500 })}>
          <h1
            className={text({ weight: 400, size: 500, color: "text" })}
            itemProp="headline"
          >
            {post.metadata.title}
          </h1>

          <h2
            className={text({
              weight: 300,
              size: 300,
              leading: 300,
              color: "text",
            })}
            itemProp="alternativeHeadline"
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
          <div className={prose()} itemProp="articleBody">
            <React.Suspense fallback={null}>
              <post.component />
            </React.Suspense>
          </div>
        </MDXProvider>

        <ul
          aria-label="Post tags"
          className={clsx(
            inline({ gap: 300 }),
            bleed({ amount: ["em300"] }),
            tags()
          )}
        >
          {post.metadata.tags.map((tag) => (
            <li key={tag}>
              <Link to="tag" params={{ tag }} rel="tag">
                {tag}
              </Link>
            </li>
          ))}
        </ul>

        <div className={divider()} />

        <section
          className={grid({
            cols: ["min-content", "auto"],
            gap: 500,
            alignY: { min: "stretch", sm: "center" },
          })}
          aria-label="Written by Jared Lunde. I am just building the things that make me curious."
        >
          <div
            className={box({
              pad: ["none", 500, "none", "none"],
              border: [["none", 50, "none", "none"], "border"],
            })}
            style={{ whiteSpace: "pre" }}
            aria-hidden
          >
            <div className={text({ variant: "caption" })}>Written by</div>
            <div className="author" itemProp="author">
              Jared Lunde
            </div>
          </div>

          <p className={text({ color: "text400", size: 200 })} aria-hidden>
            <span>✌️</span> I&apos;m just building the things that make me
            curious
          </p>
        </section>
      </div>

      <div className={divider()} />

      <aside
        className={vstack({
          gap: 500,
          pad: { min: [400, 500, 500], sm: [400, 600, 600] },
        })}
      >
        <h2
          id="related-posts"
          className={text({
            weight: 400,
            size: 400,
            leading: 300,
            color: "text",
          })}
          aria-hidden
        >
          Recommended for you
        </h2>

        <RelatedPosts
          post={post}
          posts={posts}
          aria-labelledby="related-posts"
        />
      </aside>
    </article>
  );
};

const tags = styles.one(
  mq({
    default: (t) => ({
      "> li a": {
        color: t.color.secondary,
        backgroundColor: t.iconButton.color.primary.bg,
        fontWeight: "bold",
        fontSize: 11 / 16 + "rem",
        borderRadius: t.radius.primary,
        padding: `${t.pad.em200} ${t.pad.em400}`,
        textDecoration: "none",
        textTransform: "uppercase",
      },

      "> li a:focus-visible": {
        color: t.iconButton.color.primary.hoverText,
        backgroundColor: t.iconButton.color.primary.hoverBg,
        textDecoration: "none!important",
      },
    }),
    hover: (t) => ({
      "> li a:hover": {
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
