/**
 * Rounds units to a fixed number (7)
 * @param num The number to round
 */
export const round = (num: number) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')

/**
 * Converts `px` to `rem` units
 *
 * @param px A number in `px` to convert to `rem`
 */
export const rem = (px: number) => `${round(px / 16)}rem`

/**
 * Converts `px` to `em` units based on a base number.
 *
 * @param px A number in `px` to convert to `em`
 * @param base The base number that the resulting `em` is calculated relative to
 */
export const em = (px: number, base: number) => `${round(px / base)}em`

export function noop() {}
