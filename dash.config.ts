import compound from "@dash-ui/compound";
import dashMq from "@dash-ui/mq";
import responsive from "@dash-ui/responsive";
import type { Responsive } from "@dash-ui/responsive";
import { compileStyles, createStyles, pathToToken } from "@dash-ui/styles";
import type {
  DashThemes,
  DashTokens,
  StyleCallback,
  StyleMap,
  Styles,
  StyleValue,
  TokensUnion,
} from "@dash-ui/styles";
import { persistAtom } from "@/stores/atoms";
import { em, rem } from "@/utils/unit";

/**
 * Design tokens
 * Mostly courtesy of: https://tailwindcss.com
 */
const colorSystem = {
  current: "currentColor",

  black: "#000",
  white: "#fff",
  transparent: "transparent",

  rose50: "#fff1f2",
  rose100: "#ffe4e6",
  rose200: "#fecdd3",
  rose300: "#fda4af",
  rose400: "#fb7185",
  rose500: "#f43f5e",
  rose600: "#e11d48",
  rose700: "#be123c",
  rose800: "#9f1239",
  rose900: "#881337",

  pink50: "#fdf2f8",
  pink100: "#fce7f3",
  pink200: "#fbcfe8",
  pink300: "#f9a8d4",
  pink400: "#f472b6",
  pink500: "#ec4899",
  pink600: "#db2777",
  pink700: "#be185d",
  pink800: "#9d174d",
  pink900: "#831843",

  fuchsia50: "#fdf4ff",
  fuchsia100: "#fae8ff",
  fuchsia200: "#f5d0fe",
  fuchsia300: "#f0abfc",
  fuchsia400: "#e879f9",
  fuchsia500: "#d946ef",
  fuchsia600: "#c026d3",
  fuchsia700: "#a21caf",
  fuchsia800: "#86198f",
  fuchsia900: "#701a75",

  purple50: "#faf5ff",
  purple100: "#f3e8ff",
  purple200: "#e9d5ff",
  purple300: "#d8b4fe",
  purple400: "#c084fc",
  purple500: "#a855f7",
  purple600: "#9333ea",
  purple700: "#7e22ce",
  purple800: "#6b21a8",
  purple900: "#581c87",

  violet50: "#f5f3ff",
  violet100: "#ede9fe",
  violet200: "#ddd6fe",
  violet300: "#c4b5fd",
  violet400: "#a78bfa",
  violet500: "#8b5cf6",
  violet600: "#7c3aed",
  violet700: "#6d28d9",
  violet800: "#5b21b6",
  violet900: "#4c1d95",

  indigo50: "#eef2ff",
  indigo100: "#e0e7ff",
  indigo200: "#c7d2fe",
  indigo300: "#a5b4fc",
  indigo400: "#818cf8",
  indigo500: "#6366f1",
  indigo600: "#4f46e5",
  indigo700: "#4338ca",
  indigo800: "#3730a3",
  indigo900: "#312e81",

  blue50: "#eff6ff",
  blue100: "#dbeafe",
  blue200: "#bfdbfe",
  blue300: "#93c5fd",
  blue400: "#60a5fa",
  blue500: "#3b82f6",
  blue600: "#2563eb",
  blue700: "#1d4ed8",
  blue800: "#1e40af",
  blue900: "#1e3a8a",

  lightBlue50: "#f0f9ff",
  lightBlue100: "#e0f2fe",
  lightBlue200: "#bae6fd",
  lightBlue300: "#7dd3fc",
  lightBlue400: "#38bdf8",
  lightBlue500: "#0ea5e9",
  lightBlue600: "#0284c7",
  lightBlue700: "#0369a1",
  lightBlue800: "#075985",
  lightBlue900: "#0c4a6e",

  cyan50: "#ecfeff",
  cyan100: "#cffafe",
  cyan200: "#a5f3fc",
  cyan300: "#67e8f9",
  cyan400: "#22d3ee",
  cyan500: "#06b6d4",
  cyan600: "#0891b2",
  cyan700: "#0e7490",
  cyan800: "#155e75",
  cyan900: "#164e63",

  teal50: "#f0fdfa",
  teal100: "#ccfbf1",
  teal200: "#99f6e4",
  teal300: "#5eead4",
  teal400: "#2dd4bf",
  teal500: "#14b8a6",
  teal600: "#0d9488",
  teal700: "#0f766e",
  teal800: "#115e59",
  teal900: "#134e4a",

  emerald50: "#ecfdf5",
  emerald100: "#d1fae5",
  emerald200: "#a7f3d0",
  emerald300: "#6ee7b7",
  emerald400: "#34d399",
  emerald500: "#10b981",
  emerald600: "#059669",
  emerald700: "#047857",
  emerald800: "#065f46",
  emerald900: "#064e3b",

  green50: "#f0fdf4",
  green100: "#dcfce7",
  green200: "#bbf7d0",
  green300: "#86efac",
  green400: "#4ade80",
  green500: "#22c55e",
  green600: "#16a34a",
  green700: "#15803d",
  green800: "#166534",
  green900: "#14532d",

  lime50: "#f7fee7",
  lime100: "#ecfccb",
  lime200: "#d9f99d",
  lime300: "#bef264",
  lime400: "#a3e635",
  lime500: "#84cc16",
  lime600: "#65a30d",
  lime700: "#4d7c0f",
  lime800: "#3f6212",
  lime900: "#365314",

  yellow50: "#fefce8",
  yellow100: "#fef9c3",
  yellow200: "#fef08a",
  yellow300: "#fde047",
  yellow400: "#facc15",
  yellow500: "#eab308",
  yellow600: "#ca8a04",
  yellow700: "#a16207",
  yellow800: "#854d0e",
  yellow900: "#713f12",

  amber50: "#fffbeb",
  amber100: "#fef3c7",
  amber200: "#fde68a",
  amber300: "#fcd34d",
  amber400: "#fbbf24",
  amber500: "#f59e0b",
  amber600: "#d97706",
  amber700: "#b45309",
  amber800: "#92400e",
  amber900: "#78350f",

  orange50: "#fff7ed",
  orange100: "#ffedd5",
  orange200: "#fed7aa",
  orange300: "#fdba74",
  orange400: "#fb923c",
  orange500: "#f97316",
  orange600: "#ea580c",
  orange700: "#c2410c",
  orange800: "#9a3412",
  orange900: "#7c2d12",

  red50: "#fef2f2",
  red100: "#fee2e2",
  red200: "#fecaca",
  red300: "#fca5a5",
  red400: "#f87171",
  red500: "#ef4444",
  red600: "#dc2626",
  red700: "#b91c1c",
  red800: "#991b1b",
  red900: "#7f1d1d",

  warmGray50: "#fafaf9",
  warmGray100: "#f5f5f4",
  warmGray200: "#e7e5e4",
  warmGray300: "#d6d3d1",
  warmGray400: "#a8a29e",
  warmGray500: "#78716c",
  warmGray600: "#57534e",
  warmGray700: "#44403c",
  warmGray800: "#292524",
  warmGray900: "#1c1917",

  trueGray50: "#fafafa",
  trueGray100: "#f5f5f5",
  trueGray200: "#e5e5e5",
  trueGray300: "#d4d4d4",
  trueGray400: "#a3a3a3",
  trueGray500: "#737373",
  trueGray600: "#525252",
  trueGray700: "#404040",
  trueGray800: "#262626",
  trueGray900: "#171717",

  gray50: "#fafafa",
  gray100: "#f4f4f5",
  gray200: "#e4e4e7",
  gray300: "#d4d4d8",
  gray400: "#a1a1aa",
  gray500: "#71717a",
  gray600: "#52525b",
  gray700: "#3f3f46",
  gray800: "#27272a",
  gray900: "#18181b",

  coolGray50: "#f9fafb",
  coolGray100: "#f3f4f6",
  coolGray200: "#e5e7eb",
  coolGray300: "#d1d5db",
  coolGray400: "#9ca3af",
  coolGray500: "#6b7280",
  coolGray600: "#4b5563",
  coolGray700: "#374151",
  coolGray800: "#1f2937",
  coolGray900: "#111827",

  blueGray50: "#f8fafc",
  blueGray100: "#f1f5f9",
  blueGray200: "#e2e8f0",
  blueGray300: "#cbd5e1",
  blueGray400: "#94a3b8",
  blueGray500: "#64748b",
  blueGray600: "#475569",
  blueGray700: "#334155",
  blueGray800: "#1e293b",
  blueGray900: "#0f172a",
} as const;

const typeSystem = {
  family: {
    sans: [
      `system-ui`,
      `-apple-system`,
      `BlinkMacSystemFont`,
      `Segoe UI`,
      `Roboto`,
      `sans-serif`,
    ]
      .map((s) => `"${s}"`)
      .join(","),
    serif: ["Lora", "Palatino", "Times New Roman", "Times", "serif"]
      .map((s) => `"${s}"`)
      .join(","),
    mono: [
      "JetBrains Mono",
      "Monaco",
      "Andale Mono",
      "Consolas",
      "Liberation Mono",
      "Courier New",
      "monospace",
    ]
      .map((s) => `"${s}"`)
      .join(","),
  } as const,

  size: {
    50: "0.75rem",
    100: "0.875rem",
    200: "1rem",
    300: "1.125rem",
    400: "1.25rem",
    500: "1.5rem",
    600: "1.875rem",
    700: "2.25rem",
    800: "3rem",
    900: "4rem",
  },

  leading: {
    100: "1",
    200: "1.25",
    300: "1.375",
    400: "1.5",
    500: "1.625",
    600: "2",
    em100: "0.75em",
    em200: "1em",
    em300: "1.25em",
    em400: "1.5em",
    em500: "1.75em",
    em600: "2em",
    em700: "2.25em",
    em800: "2.5em",
  },

  tracking: {
    [-300]: "-0.05em",
    [-200]: "-0.025em",
    100: "0",
    200: "0.025em",
    300: "0.05em",
    400: "0.1em",
  },
} as const;

const padScale = {
  none: "0",

  100: "0.0625rem",
  200: "0.125rem",
  300: "0.25rem",
  400: "0.5rem",
  500: "1rem",
  600: "2rem",
  700: "4rem",
  800: "8rem",
  900: "16rem",

  em100: "0.125em",
  em200: "0.25em",
  em300: "0.5em",
  em400: "0.75em",
  em500: "1em",
  em600: "1.25em",
  em700: "2em",
  em800: "3.25em",
  em900: "5.25em",
} as const;

const radiusScale = {
  none: "0",
  primary: "1rem",
  100: "0.125rem",
  200: "0.25rem",
  300: "0.375rem",
  400: "0.5rem",
  500: "1rem",
  max: "625rem",
} as const;

const gapScale = {
  none: "0",
  auto: "auto",

  [-100]: "-0.0625rem",
  [-200]: "-0.125rem",
  [-300]: "-0.25rem",
  [-400]: "-0.5rem",
  [-500]: "-1rem",
  [-600]: "-2rem",
  [-700]: "-4rem",
  [-800]: "-8rem",
  [-900]: "-16rem",

  100: "0.0625rem",
  200: "0.125rem",
  300: "0.25rem",
  400: "0.5rem",
  500: "1rem",
  600: "2rem",
  700: "4rem",
  800: "8rem",
  900: "16rem",

  "-em100": "-0.125em",
  "-em200": "-0.25em",
  "-em300": "-0.5em",
  "-em400": "-0.75em",
  "-em500": "-1em",
  "-em600": "-1.25em",
  "-em700": "-2em",
  "-em800": "-3.25em",
  "-em900": "-5.25em",

  em100: "0.125em",
  em200: "0.25em",
  em300: "0.5em",
  em400: "0.75em",
  em500: "1em",
  em600: "1.25em",
  em700: "2em",
  em800: "3.25em",
  em900: "5.25em",
} as const;

const transitionSystem = {
  duration: {
    faster: "120ms",
    fast: "240ms",
    normal: "320ms",
    slow: "480ms",
    slower: "640ms",
  },
  timing: {
    primary: "cubic-bezier(0.4, 0, 0.2, 1)",
    accelerated: "cubic-bezier(0.4, 0, 1, 1)",
    decelerated: "cubic-bezier(0, 0, 0.2, 1)",
    elastic: "cubic-bezier(0.8, -0.5, 0.2, 1.4)",
    bounce: "cubic-bezier(0.8, 0.5, 0.2, 1.4)",
  },
} as const;

const zScale = {
  min: 0,
  100: 1,
  200: 10,
  300: 100,
  400: 1000,
  500: 10000,
  600: 100000,
  700: 1000000,
  800: 10000000,
  900: 100000000,
  max: 2147483647,
} as const;

const borderWidthScale = {
  none: 0,
  // Hairline borders
  50:
    (typeof window === "undefined"
      ? 1
      : "devicePixelRatio" in window && devicePixelRatio >= 2
      ? 0.5
      : 1) + "px",
  100: 1 + "px",
  200: 2 + "px",
  300: 4 + "px",
} as const;

const tokens = {
  vh: "100vh",
  font: typeSystem,
  radius: radiusScale,
  pad: padScale,
  gap: gapScale,
  transition: transitionSystem,
  zIndex: zScale,
  borderWidth: borderWidthScale,
  color: colorSystem,
};

export const themes = {
  light: {
    shadow: {
      none: "none",
      primary:
        "0 0 12px -3px rgba(0, 0, 0, 0.2), 0 0 6px -2px rgba(0, 0, 0, 0.2)",
      100: "0 0 0 1px rgba(0, 0, 0, 0.05)",
      200: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      300: "0 0 12px -3px rgba(0, 0, 0, 0.2), 0 0 6px -2px rgba(0, 0, 0, 0.2)",
      400: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      500: "0 0 15px -3px rgba(0, 0, 0, 0.2), 0 0 6px -2px rgba(0, 0, 0, 0.2)",
      600: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      700: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      inset: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      outline: "0 0 3px 3px rgba(66, 153, 225, 0.5)",
    },

    color: {
      bodyBg: pathToToken<Tokens>("color.white"),
      border: pathToToken<Tokens>("color.blueGray200"),
      accent: pathToToken<Tokens>("color.blueGray100"),

      primary: pathToToken<Tokens>("color.blueGray800"),
      secondary: pathToToken<Tokens>("color.blue700"),

      text: pathToToken<Tokens>("color.blueGray800"),
      text500: pathToToken<Tokens>("color.blueGray600"),
      text400: pathToToken<Tokens>("color.blueGray500"),
    },

    button: {
      color: {
        primary: {
          bg: pathToToken<Tokens>("color.blueGray900"),
          text: pathToToken<Tokens>("color.white"),
          hoverBg: pathToToken<Tokens>("color.blueGray700"),
          hoverText: pathToToken<Tokens>("color.white"),
          activeBg: pathToToken<Tokens>("color.black"),
          activeText: pathToToken<Tokens>("color.white"),
        },
        secondary: {
          bg: pathToToken<Tokens>("color.blue600"),
          text: pathToToken<Tokens>("color.white"),
          hoverBg: pathToToken<Tokens>("color.blue500"),
          hoverText: pathToToken<Tokens>("color.white"),
          activeBg: pathToToken<Tokens>("color.blue800"),
          activeText: pathToToken<Tokens>("color.white"),
        },
        disabled: {
          bg: pathToToken<Tokens>("color.gray300"),
          text: pathToToken<Tokens>("color.gray700"),
        },
      },

      size: {
        xs: {
          fontSize: pathToToken<Tokens>("font.size.100"),
          fontWeight: 500,
          padding: `${pathToToken<Tokens>("gap.em300")} ${pathToToken<Tokens>(
            "gap.em400"
          )}`,
        },
        sm: {
          fontSize: pathToToken<Tokens>("font.size.100"),
          fontWeight: 500,
          padding: `${pathToToken<Tokens>("gap.em400")} ${pathToToken<Tokens>(
            "gap.em500"
          )}`,
        },
        md: {
          fontSize: pathToToken<Tokens>("font.size.200"),
          fontWeight: 500,
          padding: `${rem(16)} ${rem(22)}`,
        },
        lg: {
          fontSize: pathToToken<Tokens>("font.size.400"),
          fontWeight: 500,
          padding: `${rem(22)} ${rem(30)}`,
        },
      },
    },

    iconButton: {
      color: {
        primary: {
          bg: pathToToken<Tokens>("color.transparent"),
          text: pathToToken<Tokens>("color.current"),
          hoverBg: pathToToken<Tokens>("color.blueGray300"),
          hoverText: pathToToken<Tokens>("color.blueGray900"),
          activeBg: pathToToken<Tokens>("color.blueGray400"),
          activeText: pathToToken<Tokens>("color.blueGray900"),
        },
        secondary: {
          bg: pathToToken<Tokens>("color.blueGray600"),
          text: pathToToken<Tokens>("color.white"),
          hoverBg: pathToToken<Tokens>("color.blueGray500"),
          hoverText: pathToToken<Tokens>("color.white"),
          activeBg: pathToToken<Tokens>("color.blueGray700"),
          activeText: pathToToken<Tokens>("color.white"),
        },
        disabled: {
          bg: pathToToken<Tokens>("color.gray300"),
          text: pathToToken<Tokens>("color.gray700"),
        },
      },

      size: {
        xs: {
          fontSize: pathToToken<Tokens>("font.size.100"),
          padding: pathToToken<Tokens>("gap.em200"),
        },
        sm: {
          fontSize: pathToToken<Tokens>("font.size.200"),
          padding: pathToToken<Tokens>("pad.300"),
        },
        md: {
          fontSize: pathToToken<Tokens>("font.size.200"),
          padding: pathToToken<Tokens>("gap.em300"),
        },
        lg: {
          fontSize: pathToToken<Tokens>("font.size.300"),
          padding: pathToToken<Tokens>("gap.em400"),
        },
      },
    },
  },

  dark: {
    shadow: {
      none: "none",
      primary:
        "0 0 12px -3px rgba(0, 0, 0, 0.2), 0 0 6px -2px rgba(0, 0, 0, 0.2)",
      100: "0 0 0 1px rgba(0, 0, 0, 0.05)",
      200: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      300: "0 0 12px -3px rgba(0, 0, 0, 0.2), 0 0 6px -2px rgba(0, 0, 0, 0.2)",
      400: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      500: "0 0 15px -3px rgba(0, 0, 0, 0.2), 0 0 6px -2px rgba(0, 0, 0, 0.2)",
      600: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      700: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      inset: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      outline: "0 0 3px 3px rgba(66, 153, 225, 0.5)",
    },

    color: {
      bodyBg: pathToToken<Tokens>("color.black"),
      border: pathToToken<Tokens>("color.blueGray700"),
      accent: pathToToken<Tokens>("color.blueGray900"),

      primary: pathToToken<Tokens>("color.white"),
      secondary: pathToToken<Tokens>("color.blue400"),

      text: pathToToken<Tokens>("color.white"),
      text500: pathToToken<Tokens>("color.blueGray300"),
      text400: pathToToken<Tokens>("color.blueGray400"),
    },

    button: {
      color: {
        primary: {
          bg: pathToToken<Tokens>("color.blueGray900"),
          text: pathToToken<Tokens>("color.white"),
          hoverBg: pathToToken<Tokens>("color.blueGray700"),
          hoverText: pathToToken<Tokens>("color.white"),
          activeBg: pathToToken<Tokens>("color.black"),
          activeText: pathToToken<Tokens>("color.white"),
        },
        secondary: {
          bg: pathToToken<Tokens>("color.blue600"),
          text: pathToToken<Tokens>("color.white"),
          hoverBg: pathToToken<Tokens>("color.blue500"),
          hoverText: pathToToken<Tokens>("color.white"),
          activeBg: pathToToken<Tokens>("color.blue800"),
          activeText: pathToToken<Tokens>("color.white"),
        },
        disabled: {
          bg: pathToToken<Tokens>("color.gray300"),
          text: pathToToken<Tokens>("color.gray700"),
        },
      },

      size: {
        xs: {
          fontSize: pathToToken<Tokens>("font.size.100"),
          fontWeight: 500,
          padding: `${pathToToken<Tokens>("gap.em300")} ${pathToToken<Tokens>(
            "gap.em400"
          )}`,
        },
        sm: {
          fontSize: pathToToken<Tokens>("font.size.100"),
          fontWeight: 500,
          padding: `${pathToToken<Tokens>("gap.em400")} ${pathToToken<Tokens>(
            "gap.em500"
          )}`,
        },
        md: {
          fontSize: pathToToken<Tokens>("font.size.200"),
          fontWeight: 500,
          padding: `${rem(16)} ${rem(22)}`,
        },
        lg: {
          fontSize: pathToToken<Tokens>("font.size.400"),
          fontWeight: 500,
          padding: `${rem(22)} ${rem(30)}`,
        },
      },
    },

    iconButton: {
      color: {
        primary: {
          bg: pathToToken<Tokens>("color.transparent"),
          text: pathToToken<Tokens>("color.current"),
          hoverBg: pathToToken<Tokens>("color.blueGray800"),
          hoverText: pathToToken<Tokens>("color.blueGray200"),
          activeBg: pathToToken<Tokens>("color.blueGray900"),
          activeText: pathToToken<Tokens>("color.blueGray100"),
        },
        secondary: {
          bg: pathToToken<Tokens>("color.white"),
          text: pathToToken<Tokens>("color.black"),
          hoverBg: pathToToken<Tokens>("color.blueGray500"),
          hoverText: pathToToken<Tokens>("color.white"),
          activeBg: pathToToken<Tokens>("color.blueGray700"),
          activeText: pathToToken<Tokens>("color.white"),
        },
        disabled: {
          bg: pathToToken<Tokens>("color.gray300"),
          text: pathToToken<Tokens>("color.gray700"),
        },
      },

      size: {
        xs: {
          fontSize: pathToToken<Tokens>("font.size.100"),
          padding: pathToToken<Tokens>("gap.em200"),
        },
        sm: {
          fontSize: pathToToken<Tokens>("font.size.200"),
          padding: pathToToken<Tokens>("pad.300"),
        },
        md: {
          fontSize: pathToToken<Tokens>("font.size.200"),
          padding: pathToToken<Tokens>("gap.em300"),
        },
        lg: {
          fontSize: pathToToken<Tokens>("font.size.300"),
          padding: pathToToken<Tokens>("gap.em400"),
        },
      },
    },
  },
} as const;

/**
 * A `styles` instance that is configured to use your design tokens
 * and themes.
 *
 * @see https://github.com/dash-ui/styles
 */
export const styles = createStyles({
  tokens,
  themes,
});

/**
 * These are the media queries you're using throughout your app.
 * These media queries will be available in media query props and
 * through the `mq()` helper below.
 */
export const mediaQueries = {
  /**
   * min-width: 0
   */
  min: `only screen and (min-width: 0)`,
  /**
   * min-width: 560px
   */
  xs: `only screen and (min-width: ${em(560)})`,
  /**
   * min-width: 768px
   */
  sm: `only screen and (min-width: ${em(768)})`,
  /**
   * min-width: 1024px
   */
  md: `only screen and (min-width: ${em(1024)})`,
  /**
   * min-width: 1280px
   */
  lg: `only screen and (min-width: ${em(1280)})`,
  /**
   * min-width: 1440px
   */
  xl: `only screen and (min-width: ${em(1440)})`,
  /**
   * High DPI devices
   */
  retina: "(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)",
  /**
   * Hover-enabled devices
   */
  hover: "(hover: hover)",
} as const;

/**
 * A helper for adding media queries to Dash `styles.variants`, `styles.one`,
 * `styles.cls`, etc. without having to type `@media blah blah` every
 * time.
 *
 * @see https://github.com/dash-ui/mq
 */
export const mq = dashMq(styles, mediaQueries);

/**
 * A function for adding responsive props/styles to components
 *
 * @see https://github.com/dash-ui/responsive
 */
export const responsiveStyles = responsive(styles, mediaQueries);

/**
 * A function for creating compound/multi-variant styles
 *
 * @see https://github.com/dash-ui/compound
 */
export const compoundStyles = compound(styles);

/**
 * A function for piping acceptable Dash style values left-to-right and returning a
 * compiled styled string.
 *
 * @param styles - A Dash styles instance
 * @example
 * ```ts
 * const pipeStyles = pipe(styles)
 *
 * const style = style.one(
 *   pipeStyles(
 *     row({gap: 300}),
 *     text({variant: 'body'}),
 *     t => ({
 *       color: t.color.primary,
 *     })
 *   )
 * )
 * ```
 */
function pipe<Tokens extends DashTokens, Themes extends DashThemes>(
  styles: Styles<Tokens, Themes>
) {
  return (
      ...css: StyleValue<Tokens, Themes>[]
    ): StyleCallback<Tokens, Themes> =>
    (t) =>
      css.reduce<string>((acc, c) => acc + compileStyles(c, t), "");
}

export const pipeStyles = pipe(styles);

/**
 * An localsStorage atom that stores the name of the current theme
 *
 * @see https://github.com/pmndrs/jotai
 */
export const themeAtom = persistAtom<keyof Themes>(
  "theme",
  typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)")
    ? "dark"
    : "light"
);

export type Tokens = typeof tokens;
export type Themes = typeof themes;
export type DesignTokens = TokensUnion<Tokens, Themes>;
export type ThemeNames = keyof Themes;
export type MediaQueries = typeof mediaQueries;
export type ResponsiveProp<Variant> =
  | Variant
  | Responsive<Variant, MediaQueries>;
export type TokenVariants<T extends Record<string | number, unknown>> =
  StyleMap<Extract<keyof T, string | number>, Tokens, Themes>;
