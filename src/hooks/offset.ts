import React from 'react'

export function useOffset<T extends HTMLElement>(
  elementRef: React.RefObject<T>,
  deps: React.DependencyList = []
): number {
  const [offset, setOffset] = React.useState(0)

  React.useLayoutEffect(() => {
    const {current} = elementRef
    if (current !== null) {
      let nextOffset = 0
      let el = current

      do {
        nextOffset += el.offsetTop || 0
        el = el.offsetParent as T
      } while (el)

      if (nextOffset !== offset) {
        setOffset(nextOffset)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return offset
}
