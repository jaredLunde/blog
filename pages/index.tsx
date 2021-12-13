import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useOrder } from "proser";
import * as React from "react";
import { PostsList } from "@/components/posts-list";
import { posts } from "@/posts";
import { absRoutes } from "@/routes.config";
import { vstack } from "@/styles/layout";

const Home: NextPage<HomeProps> = function ({}) {
  const orderedPosts = useOrder(posts, "desc");

  return (
    <div>
      <NextSeo
        title="✌️ Jared Lunde / UI Engineer / Denver, CO"
        description={`👋 I'm a UI engineer & creative living in Denver, Colorado. Follow my blog to see what I am thinking about right now.`}
        canonical={absRoutes.home()}
        openGraph={{ images: [{ url: "/dunes.jpg" }] }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />

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

export interface HomeProps {}

export default Home;
