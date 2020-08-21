/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import {Image} from '@design-system/image'
import ago from 's-ago'
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
