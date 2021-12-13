import { useGlobal, useTokens } from "@dash-ui/react";
import resetGlobalStyles from "@dash-ui/reset";
import useLayoutEffect from "@react-hook/passive-layout-effect";
import { useAtom } from "jotai";
import * as React from "react";
import { useSubscription } from "use-subscription";
import { mq, styles, themeAtom, themes } from "@/dash.config";
import { fontScale, fontScaleAtom } from "@/styles/text";
import { keys } from "@/utils/obj";

/**
 * Injects global styles for the app
 */
export function GlobalStyles() {
  const [theme] = useAtom(themeAtom);
  const [fontScaleKey] = useAtom(fontScaleAtom);
  useFillAvailable();
  useGlobal(styles, resetGlobalStyles, []);
  useGlobal(
    styles,
    (t) => ({
      "*, ::before, ::after, body": {
        position: "relative",
        margin: 0,
        overflowWrap: "break-word",
      },
      "*:focus": {
        outline: "none",
      },
      "::selection, ::-moz-selection": {
        backgroundColor: t.color.indigo200,
      },
      html: {
        fontSize: fontScale[fontScaleKey],
        overflowX: "hidden",

        ":focus-within": {
          scrollBehavior: "smooth",
        },
      },
      body: {
        minWidth: "100%",
        minHeight: t.vh,
        backgroundColor: t.color.bodyBg,
      },
      ".loud": {
        transitionProperty: "opacity,visibility",
        transitionDuration: t.transition.duration.slower,
        transitionTimingFunction: t.transition.timing.primary,
      },
      ".writing-mode-enabled .loud": {
        opacity: "0!important",
        visibility: "hidden",
      },
      ".writing-mode-disabled .loud": {
        opacity: 1,
        visibility: "visible",
      },
    }),
    [fontScaleKey]
  );
  useGlobal(
    styles,
    mq({
      default: (t) => ({
        body: {
          fontSize: t.font.size[200],
          fontFamily: t.font.family.sans,
          fontWeight: 300,
          color: t.color.text500,
          textRendering: "optimizeSpeed",
        },
        "h1,h2,h3": {
          textRendering: "optimizeLegibility",
        },
        "h1,h2,h3,h4,h5,h6": {
          fontWeight: "inherit",
        },
        "a:not([class])": {
          color: t.color.secondary,
          fontWeight: 500,
          textDecoration: "none",

          "&:hover": {
            textDecoration: "underline",
          },

          "&:focus-visible": {
            textDecoration: "underline",
          },
        },
      }),
      retina: {
        "h1,h2,h3,h4,h5,h6": {
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "coolGrayscale",
        },
      },
    }),
    []
  );

  useLayoutEffect(() => {
    if (theme) {
      for (const themeName of keys(themes)) {
        if (themeName !== theme)
          document.body.classList.remove(styles.theme(themeName));
      }

      document.body.classList.add(styles.theme(theme));
    }
  }, [theme]);

  return null;
}

function useFillAvailable() {
  const windowHeight = useSubscription(
    React.useMemo(
      () => ({
        getCurrentValue() {
          return typeof window === "undefined"
            ? "100vh"
            : window.innerHeight + "px";
        },
        subscribe(callback) {
          window.addEventListener("resize", callback);

          return () => {
            window.removeEventListener("resize", callback);
          };
        },
      }),
      []
    )
  );

  useTokens(styles, { vh: windowHeight }, [windowHeight]);
}
