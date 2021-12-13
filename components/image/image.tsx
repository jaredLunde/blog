import React from "react";
import { Icon } from "@/components/icon";
import { box } from "@/styles/layout";

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ source, src, alt, caption, width, height, ...props }, ref) => {
    const sources = [];

    if (src !== undefined) {
      sources.push(<source key="src" media="(min-width: 0)" srcSet={src} />);
    }

    const picture = (
      <picture className={box({ width, height })}>
        {sources}

        <img
          src={src}
          alt={alt}
          ref={ref}
          width={width}
          height={height}
          className={box({ radius: "primary" })}
          {...props}
        />
      </picture>
    );

    return !source ? (
      picture
    ) : (
      <figure aria-label={alt}>
        {picture}
        <figcaption className={box({ pad: ["none", "em500"] })}>
          {caption}{" "}
          <a href={source}>
            Source <Icon name="System/external-link-fill" />
          </a>
        </figcaption>
      </figure>
    );
  }
);

export interface ImageProps
  extends Omit<
    React.ImgHTMLAttributes<HTMLImageElement>,
    "className" | "placeholder" | "src" | "srcSet"
  > {
  alt: string;
  source?: string;
  caption?: React.ReactNode;
  src?: string;
}
