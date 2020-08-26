/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import ago from 's-ago'
import clsx from 'clsx'
import {Icon} from '@design-system/icon'
import {Image} from '@design-system/image'
import {styles} from '@design-system/styles'
import {mq} from '@design-system/mq'
import AnchorIcon from '@assets/link.svg'
const CodeBlock = React.lazy(() => import('./code-block'))

export function pre({children}: {children: React.ReactNode}) {
  return <React.Fragment children={children} />
}

export function code({className = '', ...props}: any) {
  return className ? (
    <CodeBlock language={className.replace(/language-/, '')} {...props} />
  ) : (
    <code {...props} />
  )
}

export function img(
  props: React.ImgHTMLAttributes<HTMLImageElement> & {alt: string}
) {
  return <Image {...props} />
}

export function time({children}: {children: number}) {
  const datetime = new Date(children)
  return <time dateTime={datetime.toJSON()}>{ago(datetime)}</time>
}

function createHeading(Component: 'h1' | 'h2' | 'h3' | 'h4' | 'h5') {
  return function Heading({
    id,
    children,
    className,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
      <Component {...props} id={id} className={clsx(className, heading())}>
        <a href={`#${id}`} className='anchor' aria-hidden>
          <Icon color='gray500' render={AnchorIcon} />
        </a>

        {children}
      </Component>
    )
  }
}

export const h1 = createHeading('h1')
export const h2 = createHeading('h2')
export const h3 = createHeading('h3')
export const h4 = createHeading('h4')
export const h5 = createHeading('h5')

const heading = styles.one(
  mq({
    default: {
      '.anchor': {
        position: 'absolute',
        left: '-1em',
        fontSize: '0.9em',
        visibility: 'hidden',
      },
    },
    hover: {
      ':hover .anchor': {
        visibility: 'visible',
      },
    },
  })
)
