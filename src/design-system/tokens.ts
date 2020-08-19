//
// Design tokens
// Mostly courtesy of: https://tailwindcss.com
export const tokens = {
  vh: '100vh' as string,

  color: {
    contentBgColor: '#f2faff',
    primary: '#2B6CB0',
    white: '#fff',
    black: '#000',
    translucent: 'rgba(74, 85, 104, 0.08)',

    gray100: '#F7FAFC',
    gray200: '#EDF2F7',
    gray300: '#E2E8F0',
    gray400: '#CBD5E0',
    gray500: '#A0AEC0',
    gray600: '#718096',
    gray700: '#4A5568',
    gray800: '#2D3748',
    gray900: '#1A202C',

    red100: '#FFF5F5',
    red200: '#FED7D7',
    red300: '#FEB2B2',
    red400: '#FC8181',
    red500: '#F56565',
    red600: '#E53E3E',
    red700: '#C53030',
    red800: '#9B2C2C',
    red900: '#742A2A',

    orange100: '#FFFAF0',
    orange200: '#FEEBC8',
    orange300: '#FBD38D',
    orange400: '#F6AD55',
    orange500: '#ED8936',
    orange600: '#DD6B20',
    orange700: '#C05621',
    orange800: '#9C4221',
    orange900: '#7B341E',

    yellow100: '#FFFFF0',
    yellow200: '#FEFCBF',
    yellow300: '#FAF089',
    yellow400: '#F6E05E',
    yellow500: '#ECC94B',
    yellow600: '#D69E2E',
    yellow700: '#B7791F',
    yellow800: '#975A16',
    yellow900: '#744210',

    green100: '#F0FFF4',
    green200: '#C6F6D5',
    green300: '#9AE6B4',
    green400: '#68D391',
    green500: '#48BB78',
    green600: '#38A169',
    green700: '#2F855A',
    green800: '#276749',
    green900: '#22543D',

    teal100: '#E6FFFA',
    teal200: '#B2F5EA',
    teal300: '#81E6D9',
    teal400: '#4FD1C5',
    teal500: '#38B2AC',
    teal600: '#319795',
    teal700: '#2C7A7B',
    teal800: '#285E61',
    teal900: '#234E52',

    blue100: '#EBF8FF',
    blue200: '#BEE3F8',
    blue300: '#90CDF4',
    blue400: '#63B3ED',
    blue500: '#4299E1',
    blue600: '#3182CE',
    blue700: '#2B6CB0',
    blue800: '#2C5282',
    blue900: '#2A4365',

    indigo100: '#EBF4FF',
    indigo200: '#C3DAFE',
    indigo300: '#A3BFFA',
    indigo400: '#7F9CF5',
    indigo500: '#667EEA',
    indigo600: '#5A67D8',
    indigo700: '#4C51BF',
    indigo800: '#434190',
    indigo900: '#3C366B',

    purple100: '#FAF5FF',
    purple200: '#E9D8FD',
    purple300: '#D6BCFA',
    purple400: '#B794F4',
    purple500: '#9F7AEA',
    purple600: '#805AD5',
    purple700: '#6B46C1',
    purple800: '#553C9A',
    purple900: '#44337A',

    pink100: '#FFF5F7',
    pink200: '#FED7E2',
    pink300: '#FBB6CE',
    pink400: '#F687B3',
    pink500: '#ED64A6',
    pink600: '#D53F8C',
    pink700: '#B83280',
    pink800: '#97266D',
    pink900: '#702459',
  },

  font: {
    family: {
      sans: [
        'Manrope',
        `system-ui`,
        `-apple-system`,
        `BlinkMacSystemFont`,
        `Segoe UI`,
        `Roboto`,
        `Helvetica Neue`,
        `Noto Sans`,
        `sans-serif`,
        `Apple Color Emoji`,
        `Segoe UI Emoji`,
        `Segoe UI Symbol`,
        `Noto Color Emoji`,
      ]
        .map((s) => `"${s}"`)
        .join(','),
      serif: [
        'Petrona',
        'Palatino',
        'Georgia',
        'Cambria',
        'Times New Roman',
        'Times',
        'serif',
      ]
        .map((s) => `"${s}"`)
        .join(','),
      mono: [
        'JetBrains Mono',
        'Dank Mono',
        'Fira Code',
        'Hack',
        'Menlo',
        'Monaco',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace',
      ]
        .map((s) => `"${s}"`)
        .join(','),
    },
    size: {
      xs: `0.75rem`,
      sm: `0.875rem`,
      base: `1rem`,
      lg: `1.125rem`,
      xl: `1.25rem`,
      '2xl': `1.5rem`,
      '3xl': `1.875rem`,
      '4xl': `2.25rem`,
      '5xl': `3rem`,
      '6xl': `4rem`,
    },
    leading: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '7': '1.75rem',
      '8': '2rem',
      '9': '2.25rem',
      '10': '2.5rem',
    },
    tracking: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  radius: {
    none: '0',
    primary: '0.25rem',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: 10000 / 16 + 'rem',
  },

  elevation: {
    none: 'none',
    xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    primary: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg:
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl:
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    outline: '0 0 3px 3px rgba(66, 153, 225, 0.5)',
  },

  pad: {
    none: '0',
    xs: 4 / 16 + 'rem',
    sm: 8 / 16 + 'rem',
    md: 16 / 16 + 'rem',
    lg: 32 / 16 + 'rem',
    xl: 64 / 16 + 'rem',
  },

  gap: {
    none: '0',
    auto: 'auto',
    xxs: 1 / 16 + 'rem',
    xs: 2 / 16 + 'rem',
    sm: 4 / 16 + 'rem',
    md: 8 / 16 + 'rem',
    lg: 16 / 16 + 'rem',
    xl: 32 / 16 + 'rem',
    xxl: 64 / 16 + 'rem',
  },

  transition: {
    duration: {
      faster: '75ms',
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '1000ms',
    },
    timing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  z: {
    min: 0,
    lower: 1,
    low: 10,
    medium: 100,
    high: 1000,
    higher: 10000,
    max: 2147483647,
  },

  // Hairline borders
  hairline:
    (typeof window !== 'undefined'
      ? 1
      : 'devicePixelRatio' in window && devicePixelRatio >= 2
      ? 0.5
      : 1) + 'px',
} as const

export const themes = {
  default: tokens,
}

type AppTokens = typeof tokens
type AppThemes = typeof themes

declare module '@dash-ui/styles' {
  export interface DashTokens extends AppTokens {}
  export interface DashThemes extends AppThemes {}
}
