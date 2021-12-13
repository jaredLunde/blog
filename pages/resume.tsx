import type { NextPage } from "next";
import Head from "next/head";
import { vstack } from "@/styles/layout";
import { text } from "@/styles/text";

const Resume: NextPage = function () {
  return (
    <div
      className={vstack({
        gap: 500,
        width: { min: "100%", sm: "72ch" },
        minHeight: "100%",
        pad: { min: 500, sm: 600 },
        border: [["none", 50], "border"],
      })}
      style={{ marginLeft: "auto", marginRight: "auto" }}
    >
      <Head>
        <title>Resume / UI Engineer / Jared Lunde</title>
        <meta
          name="description"
          content={`👋 I'm a UI engineer &amp; creative living in Denver, Colorado. Follow my blog to see what I am thinking about right now.`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1 className={text({ size: 400, weight: 500 })}>🔆 About me</h1>
      </div>
    </div>
  );
};

export default Resume;
