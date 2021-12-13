import * as RadixAvatar from "@radix-ui/react-avatar";
import clsx from "clsx";
import type { ImageProps } from "next/image";
import Image from "next/image";
import * as React from "react";
import { compoundStyles, responsiveStyles, styles } from "@/dash.config";
import type { ResponsiveProp } from "@/dash.config";

export function Avatar({
  src,
  size = 200,
  className,
  alt,
  ...props
}: AvatarProps) {
  return (
    <RadixAvatar.Root asChild>
      <div className={clsx(className, avatar({ size }))}>
        <Image
          src={src}
          aria-hidden={!props["aria-label"]}
          alt={alt}
          layout="fill"
          {...props}
        />
      </div>
    </RadixAvatar.Root>
  );
}

const avatar = compoundStyles(
  {
    default: styles.one((t) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "nowrap",
      borderRadius: t.radius.max,
      overflow: "hidden",
      contain: "strict",

      img: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    })),
    size: responsiveStyles.lazy((value: keyof typeof sizes | string) => {
      return value in sizes
        ? sizes[value as keyof typeof sizes]
        : { width: value, height: value };
    }),
  },
  { atomic: true }
);

const sizes = {
  100: {
    width: 16,
    height: 16,
  },
  200: {
    width: 24,
    height: 24,
  },
  300: {
    width: 32,
    height: 32,
  },
  400: {
    width: 72,
    height: 72,
  },
  500: {
    width: 156,
    height: 156,
  },
} as const;

export interface AvatarProps extends ImageProps {
  size?: ResponsiveProp<keyof typeof sizes> | string;
  fallback?: React.ReactNode;
}
