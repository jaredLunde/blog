import { mq, responsiveStyles, styles } from "@/dash.config";
import { em, rem, round } from "@/utils/unit";

export const typography = responsiveStyles.variants({
  default: mq({
    default: ({ radius, font, color, pad }) => ({
      fontFamily: font.family.sans,
      lineHeight: font.leading[400],

      "h1,h2,h3": {
        textRendering: "optimizeLegibility",
        letterSpacing: font.tracking[100],
      },

      "&.using-keyboard a:focus": {
        boxShadow: "none",
        color: color.primary,
      },
      b: {
        fontWeight: "500",
      },
      strong: {
        fontWeight: "500",
      },
      ol: {
        counterReset: "list-counter",
      },
      "ol > li": {
        position: "relative",
        counterIncrement: "list-counter",
      },
      "ol > li::before": {
        content: 'counter(list-counter) "."',
        position: "absolute",
        fontWeight: "400",
        color: color.text400,
      },
      "ul > li": {
        position: "relative",
      },
      "ul > li::before": {
        content: '""',
        position: "absolute",
        backgroundColor: color.text400,
        top: `0.67em`,
        borderRadius: "50%",
      },
      hr: {
        height: 2,
        borderWidth: "0",
        borderRadius: radius.max,
      },
      blockquote: {
        color: color.text400,
        borderWidth: "0 0 0 0.125rem",
        borderLeftColor: "currentColor",
        borderStyle: "solid",
        quotes: '"\\201C""\\201D""\\2018""\\2019"',
        padding: `0 ${pad.em300}`,
      },
      h1: {
        fontWeight: "700",
        border: 0,
      },
      h2: {
        fontWeight: "500",
      },
      h3: {
        fontWeight: "500",
      },
      h4: {
        fontWeight: "600",
      },
      "figure figcaption": {
        fontSize: font.size[50],
        color: color.text400,
      },
      "figure img": {
        marginBottom: 0,
      },
      code: {
        fontFamily: font.family.mono,
        color: color.blue700,
        backgroundColor: color.blue200,
        borderRadius: radius.primary,
        padding: "0.125em 0.5em",
        fontWeight: "500",
      },
      pre: {
        fontFamily: font.family.mono,
        backgroundColor: color.blueGray900,
        overflowX: "auto",
      },
      "pre code": {
        backgroundColor: "transparent",
        borderWidth: "0",
        borderRadius: "0",
        padding: "0",
        fontWeight: "400",
        color: "inherit",
        fontSize: "inherit",
        fontFamily: "inherit",
        lineHeight: "inherit",
      },
      "pre code::before": {
        content: '""',
      },
      table: {
        width: "100%",
        tableLayout: "auto",
        textAlign: "left",
        borderCollapse: "collapse",
      },
      thead: {
        color: color.text400,
        fontWeight: "700",
      },
      "thead th": {
        textTransform: "uppercase",
        fontSize: "0.85em",
        letterSpacing: font.tracking[200],
        verticalAlign: "bottom",
      },
      "thead th, tbody tr td": {
        borderTop: `1px solid ${color.gray300}`,
        borderBottom: `1px solid ${color.gray300}`,
      },
      "tbody td": {
        verticalAlign: "top",
      },
      "ol > li:before": {
        left: "0",
      },
      "thead th:first-child": {
        paddingLeft: "0",
      },
      "thead th:last-child": {
        paddingRight: "0",
      },
      "tbody td:first-child": {
        paddingLeft: "0",
      },
      "tbody td:last-child": {
        paddingRight: "0",
      },
    }),
    hover: {
      a: {
        ":hover,:focus-visible": {
          boxShadow: "none",
          textDecorationStyle: "underline",
        },
      },
    },
    retina: {
      "h1,h2,h3,h4,h5,h6": {
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      },
    },
  }),
  primary: mq({
    default: (t) => ({
      lineHeight: round(28 / 16),
      blockquote: {
        paddingLeft: em(20, 20),
      },
      h1: {
        fontSize: em(28, 16),
        lineHeight: round(40 / 36),
      },
      h2: {
        fontSize: em(20, 16),
        lineHeight: round(32 / 24),
      },
      h3: {
        fontSize: em(18, 16),
        lineHeight: round(32 / 20),
      },
      h4: {
        lineHeight: round(24 / 16),
      },
      "figure figcaption": {
        fontSize: em(14, 16),
        lineHeight: round(20 / 14),
      },
      code: {
        fontSize: em(13, 16),
      },
      "h2 code": {
        fontSize: em(21, 24),
      },
      "h3 code": {
        fontSize: em(18, 20),
      },
      pre: {
        fontSize: em(14, 16),
        lineHeight: round(24 / 14),
        borderRadius: t.radius.primary,
        paddingTop: em(12, 14),
        paddingRight: em(16, 14),
        paddingBottom: em(12, 14),
        paddingLeft: em(16, 14),
      },
      "ol > li": {
        paddingLeft: em(28, 16),
      },
      "ol > li:before": {
        left: "0",
      },
      "ul > li": {
        paddingLeft: em(28, 16),
      },
      "ul > li::before": {
        width: em(6, 16),
        height: em(6, 16),
        left: em(4, 16),
      },
      table: {
        fontSize: em(14, 16),
        lineHeight: round(24 / 14),
      },
      "thead th": {
        padding: em(8, 14),
      },
      "thead th:first-child": {
        paddingLeft: "0",
      },
      "thead th:last-child": {
        paddingRight: "0",
      },
      "tbody td": {
        paddingTop: em(8, 14),
        paddingRight: em(8, 14),
        paddingBottom: em(8, 14),
        paddingLeft: em(8, 14),
      },
    }),
  }),
});

const proseSpacing = responsiveStyles.one({
  maxWidth: "80ch",
  textAlign: "left",
  table: {
    marginTop: em(32, 16),
    marginBottom: em(32, 16),
  },
  p: {
    marginTop: em(20, 16),
    marginBottom: em(20, 16),
  },
  blockquote: {
    marginTop: em(32, 20),
    marginBottom: em(32, 20),
  },
  h1: {
    marginTop: 0,
    marginBottom: em(18, 36),
  },
  h2: {
    marginTop: em(32, 24),
    marginBottom: em(18, 24),
  },
  h3: {
    marginTop: em(32, 20),
    marginBottom: em(10, 20),
  },
  h4: {
    marginTop: em(24, 16),
    marginBottom: em(8, 16),
  },
  img: {
    marginTop: em(32, 16),
    marginBottom: em(32, 16),
    maxWidth: "100vw",
    width: "100%",
    marginLeft: 0,
  },
  video: {
    marginTop: em(32, 16),
    marginBottom: em(32, 16),
    maxWidth: "100vw",

    [mq("min")]: {
      width: "100%",
      marginLeft: 0,
    },
  },
  figure: {
    marginTop: em(32, 16),
    marginBottom: em(32, 16),
    maxWidth: "100vw",
    width: "100%",
    marginLeft: 0,
  },
  "figure > *": {
    marginTop: "0",
    marginBottom: "0",
  },
  "figure figcaption": {
    marginTop: em(12, 14),
  },
  pre: {
    marginTop: em(24, 14),
    marginBottom: em(24, 14),
    maxWidth: "100vw",
    width: "100%",
    marginLeft: 0,
  },
  ol: {
    marginTop: em(20, 16),
    marginBottom: em(20, 16),
  },
  ul: {
    marginTop: em(20, 16),
    marginBottom: em(20, 16),
  },
  li: {
    marginTop: em(8, 16),
    marginBottom: em(8, 16),
  },
  "> ul > li p": {
    marginTop: em(12, 16),
    marginBottom: em(12, 16),
  },
  "> ul > li > *:first-child": {
    marginTop: em(20, 16),
  },
  "> ul > li > *:last-child": {
    marginBottom: em(20, 16),
  },
  "> ol > li > *:first-child": {
    marginTop: em(20, 16),
  },
  "> ol > li > *:last-child": {
    marginBottom: em(20, 16),
  },
  "ul ul, ul ol, ol ul, ol ol": {
    marginTop: em(12, 16),
    marginBottom: em(12, 16),
  },
  hr: {
    marginTop: em(48, 16),
    marginBottom: em(48, 16),
  },
  "hr + *": {
    marginTop: "0",
  },
  "h1 + *": {
    marginTop: "0",
  },
  "h2 + *": {
    marginTop: "0",
  },
  "h3 + *": {
    marginTop: "0",
  },
  "h4 + *": {
    marginTop: "0",
  },
  "> :first-child": {
    marginTop: "0",
  },
  "> :last-child": {
    marginBottom: "0",
  },
});

function css() {
  return proseSpacing.css() + typography.css("primary");
}

/**
 * A responsive style instance that creates typography and prose spacing
 * styles for the selected variant.
 */
export const prose = Object.assign(
  () => {
    return styles.cls(css());
  },
  {
    css,
  }
);
