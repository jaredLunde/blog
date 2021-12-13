import { resetVendorButtonStyles } from "@/components/button";
import { mq, styles } from "@/dash.config";

export const tabs = {
  tabList: styles.one((t) => ({
    display: "flex",
    flexWrap: "nowrap",
    scrollPadding: 36,
    scrollSnapType: "x mandatory",
    overflowY: "hidden",
    overflowX: "auto",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    "::-webkit-scrollbar": {
      display: "none",
    },
    transform: "translate3d(0px, 0px, 0px)",
    alignItems: "stretch",
    flexGrow: 0,
    flexShrink: 1,

    "& > *": {
      flexShrink: 0,
    },

    "& > * + *": {
      flexShrink: 0,
      marginLeft: t.gap[400],
    },
  })),

  tab: styles.one(
    mq({
      default: (t) => ({
        ...resetVendorButtonStyles,
        fontWeight: 600,
        color: t.iconButton.color.primary.text,
        flexGrow: 1,
        flexShrink: 0,
        minWidth: 56,
        borderRadius: t.radius.primary,
        padding: `${t.pad[300]} ${t.pad.em500}`,
        backgroundColor: t.iconButton.color.primary.bg,

        "&:focus-visible": {
          backgroundColor: t.color.secondary,
          color: t.color.white,
        },

        "&[aria-selected=true],&[aria-current='page']": {
          backgroundColor: t.color.primary,
          color: t.iconButton.color.secondary.text,

          "&:focus-visible": {
            backgroundColor: t.color.secondary,
          },
        },

        "&[aria-disabled=true]": {
          color: t.color.text400,
          opacity: 0.5,
        },
      }),
      hover: (t) => ({
        ":not([aria-selected=true]):not([aria-current='page']):hover": {
          backgroundColor: t.iconButton.color.primary.hoverBg,
          color: t.iconButton.color.primary.hoverText,
          cursor: "pointer",
        },

        ":not([aria-selected=true]):not([aria-current='page']):active": {
          backgroundColor: t.iconButton.color.primary.activeBg,
          color: t.iconButton.color.primary.activeText,
          cursor: "pointer",
        },

        "&[aria-selected=true],&[aria-current='page']": {
          ":hover": {},
          ":active": {},
        },
        "&[aria-disabled=true]": {
          ":hover": {
            cursor: "not-allowed",
          },
        },
      }),
    })
  ),

  tabText: styles.one({
    display: "flex",
    alignItems: "center",
    alignSelf: "stretch",
    justifySelf: "center",
    height: "100%",
    padding: 0,
  }),
};
