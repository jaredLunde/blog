import layout from "@dash-ui/layout";
import type { DesignTokens, themes } from "@/dash.config";
import { mediaQueries, styles } from "@/dash.config";

export const {
  box,
  hstack,
  vstack,
  zstack,
  inline,
  overlay,
  flexItem,
  grid,
  autoGrid,
  gridItem,
  bleed,
} = layout<DesignTokens, typeof themes, typeof mediaQueries>(
  styles,
  mediaQueries
);
