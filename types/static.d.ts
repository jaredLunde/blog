/* Use this file to declare any custom file extensions for importing */
/* Use this folder to also add/extend a package d.ts file, if needed. */

declare module '*.css'
declare module '*.svg' {
  const ref: React.RefForwardingComponent<
    SVGSVGElement,
    React.SVGAttributes<SVGSVGElement>
  >
  export default ref
}
declare module '*.svg.foo=bar' {
  const ref: React.RefForwardingComponent<
    SVGSVGElement,
    React.SVGAttributes<SVGSVGElement>
  >
  export default ref
}
declare module '*.bmp' {
  const ref: string
  export default ref
}
declare module '*.gif' {
  const ref: string
  export default ref
}
declare module '*.jpg' {
  const ref: string
  export default ref
}
declare module '*.jpeg' {
  const ref: string
  export default ref
}
declare module '*.png' {
  const ref: string
  export default ref
}
declare module '*.webp' {
  const ref: string
  export default ref
}

declare module '*.woff2' {
  const ref: string
  export default ref
}

declare module '*.ttf' {
  const ref: string
  export default ref
}

declare module '*.mdx' {
  const MDXComponent: (props) => JSX.Element
  export const metadata: Record<string, any>
  export default MDXComponent
}
