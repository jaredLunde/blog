import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useOrder } from "proser";
import * as React from "react";
import { PostsList } from "@/components/posts-list";
import { posts } from "@/posts";
import { vstack } from "@/styles/layout";

const Home: NextPage<HomeProps> = function ({}) {
  const orderedPosts = useOrder(posts, "desc");

  return (
    <div>
      <Head>
        <title>✌️ Jared Lunde / UI Engineer / Denver, CO</title>
        <meta
          name="description"
          content={`👋 I'm a UI engineer &amp; creative living in Denver, Colorado. Follow my blog to see what I am thinking about right now.`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={vstack({
          width: { min: "100%", sm: "72ch" },
          border: [["none", 50], "border"],
        })}
        style={{ marginLeft: "auto", marginRight: "auto" }}
      >
        <PostsList posts={orderedPosts} />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return {
    props: {},
  };
};

export interface HomeProps {}

export default Home;
