import crypto from "crypto";
import { Style } from "@dash-ui/react/server";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";
import * as React from "react";
import { styles } from "@/dash.config";

export default class Document extends NextDocument {
  render() {
    const nonce = crypto.randomBytes(16).toString("base64");

    return (
      <Html lang="en-US">
        <Head nonce={nonce}>
          {process.env.NEXT_PUBLIC_VERCEL_ENV !== "production" && (
            <meta name="robots" content="noindex" />
          )}
          <meta httpEquiv="Content-Security-Policy" content={csp(nonce)} />
          <meta name="referrer" content="strict-origin" />
          <meta content="yes" name="apple-mobile-web-app-capable" />
          <meta content="black" name="apple-mobile-web-app-status-bar-style" />
          <meta content="#fff" name="theme-color" />
          <meta content="#fff" name="msapplication-TileColor" />
          <meta content="@jaredLunde" name="twitter:site" />
          <meta content="@jaredLunde" name="twitter:creator" />
          <meta content="https://jaredlunde.com/" name="twitter:domain" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap"
            rel="stylesheet"
          />
          <link rel="apple-touch-icon" sizes="120x120" href="/touch-120.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/touch-152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/touch-180.png" />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon-96.png"
          />
          <Style html={this.props.html} styles={styles} />
        </Head>

        <body className={styles.theme("light")}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

function csp(nonce: string) {
  return "".concat(
    `default-src 'none';`,
    `base-uri 'self';`,
    `form-action 'self';`,
    `script-src 'self' ${
      process.env.NODE_ENV === "production"
        ? `'nonce-${nonce}'`
        : "'unsafe-eval'"
    };`,
    `style-src 'self' https://fonts.googleapis.com 'unsafe-inline';`,
    `connect-src ${
      process.env.NODE_ENV === "production"
        ? "'self' vitals.vercel-insights.com"
        : "*"
    };`,
    `prefetch-src 'self';`,
    `img-src 'self' https://*.githubusercontent.com data: blob:;`,
    `font-src 'self' https://fonts.gstatic.com;`,
    `frame-src 'self';`,
    `media-src *;`
  );
}
