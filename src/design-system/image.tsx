import React from 'react'
import {Box} from '@dash-ui/react-layout'
import type {BoxProps} from '@dash-ui/react-layout'
import {mediaQueries} from './mq'

const mediaQueryKeys = Object.keys(mediaQueries).reverse() as Exclude<
  keyof typeof mediaQueries,
  'hover'
>[]

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({src, placeholder, alt, width, height, srcSet, ...props}, ref) => {
    const sources = []
    if (srcSet) {
      for (const queryName of mediaQueryKeys) {
        if (queryName in srcSet) {
          sources.push(
            <source
              key={queryName}
              media={mediaQueries[queryName as keyof typeof mediaQueries]}
              srcSet={srcSet[queryName]}
            />
          )
        }
      }
    } else {
      sources.push(<source key='src' media='(min-width: 0)' srcSet={src} />)
    }

    return (
      <Box as='picture' width={width} height={height}>
        {sources}
        <Box
          as='img'
          src={placeholder ?? src}
          alt={alt}
          ref={ref}
          width={width}
          height={height}
          {...props}
        />
      </Box>
    )
  }
)

export interface ImageProps
  extends BoxProps,
    Omit<
      React.ImgHTMLAttributes<HTMLImageElement>,
      'width' | 'height' | 'className' | 'srcSet'
    > {
  alt: string
  placeholder?: string
  src?: string
  srcSet?: {
    [key in Extract<
      Exclude<keyof typeof mediaQueries, 'hover'>,
      string
    >]?: string
  }
}
