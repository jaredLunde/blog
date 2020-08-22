/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  extends: '@snowpack/app-scripts-react',
  devOptions: {
    port: 3000,
  },
  buildOptions: {
    minify: false,
    clean: true,
  },
  alias: {
    '@design-system': './src/design-system',
    '@hooks': './src/hooks',
    '@assets': './src/assets',
  },
  exclude: [
    '**/node_modules/**',
    '**/test/**',
    '**/.storybook/**',
    '**/coverage/**',
    '**/__fixtures__/**',
    '**/*.@(spec|test|stories|d).@(ts|tsx|js|jsx|mjs)',
  ],
  install: ['history'],
  plugins: [
    [
      'snowpack-plugin-mdx',
      {
        mdxOptions: {
          remarkPlugins: [require('remark-slug')],
        },
      },
    ],
    // ['./snowpack/plugin-proser', {include: ['**/posts/**']}],
    ['snowpack-plugin-svgr', {svgrOptions: {ref: true}}],
    [
      './snowpack/plugin-resize-images',
      {
        '**/*.placeholder.jpg': {
          resize: {
            width: 32,
          },
          blur: [32 / 4],
        },
        '**/*.560.jpg': {
          resize: {
            width: 560,
          },
        },
        '**/*.720.jpg': {
          resize: {
            width: 720,
          },
        },
        '**/*.jpg': {
          jpeg: {
            quality: 80,
          },
        },
      },
    ],
    './snowpack/plugin-compile-web-modules.js',
    './snowpack/plugin-terser.js',
  ],
}
