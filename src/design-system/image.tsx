import React from 'react'
import {Box} from '@dash-ui/react-layout'
import type {BoxProps} from '@dash-ui/react-layout'
import {useAsyncEffect} from '@react-hook/async'
import {mediaQueries} from './mq'

const mediaQueryKeys = Object.keys(mediaQueries).reverse() as Exclude<
  keyof typeof mediaQueries,
  'hover'
>[]

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({src, placeholder, alt, width, height, srcSet, ...props}, ref) => {
    // TODO: handle dynamic imports
    const sources = useAsyncEffect(async () => {
      const sources = []

      if (srcSet) {
        const srcProps: Promise<{
          media: string
          srcSet: string
        }>[] = []

        for (const queryName of mediaQueryKeys) {
          const ss = srcSet[queryName]
          if (ss !== undefined) {
            srcProps.push(
              Promise.resolve<string | typeof import('*.jpg')>(ss).then(
                (src) => ({
                  key: queryName,
                  media: mediaQueries[queryName as keyof typeof mediaQueries],
                  srcSet: typeof src === 'string' ? src : src.default,
                })
              )
            )
          }
        }

        for (const p of await Promise.all(srcProps)) {
          sources.push(<source {...p} />)
        }
      } else if (src !== undefined) {
        sources.push(
          <source
            key='src'
            media='(min-width: 0)'
            srcSet={
              await Promise.resolve<Exclude<Src, undefined>>(src).then((src) =>
                typeof src === 'string' ? src : src.default
              )
            }
          />
        )
      }

      return sources
    }, [srcSet])

    const realSrc = useAsyncEffect(
      () =>
        Promise.resolve<Src>(src).then((src) =>
          !src || typeof src === 'string' ? src : src.default
        ),
      [src]
    )
    const realPlaceholder = useAsyncEffect(
      () =>
        Promise.resolve<Src>(placeholder).then((placeholder) =>
          !placeholder || typeof placeholder === 'string'
            ? placeholder
            : placeholder.default
        ),
      [placeholder]
    )

    return (
      <Box as='picture' width={width} height={height}>
        {sources.value}

        <Box
          as='img'
          src={realPlaceholder.value ?? realSrc.value}
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
      'width' | 'height' | 'className' | 'placeholder' | 'src' | 'srcSet'
    > {
  alt: string
  placeholder?: ImageSrc
  src?: ImageSrc
  srcSet?: {
    [key in Extract<
      Exclude<keyof typeof mediaQueries, 'hover'>,
      string
    >]?: ImageSrc
  }
}

export type ImageSrc = string | Promise<typeof import('*.jpg')>

type Src = string | typeof import('*.jpg') | undefined
