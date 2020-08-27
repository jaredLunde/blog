/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

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
    '@design-system': path.join(__dirname, 'src/design-system'),
    '@hooks': path.join(__dirname, 'src/hooks'),
    '@assets': path.join(__dirname, 'src/assets'),
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
    [
      'snowpack-plugin-imagemin',
      {
        include: ['**/*.png'],
        plugins: [require('imagemin-optipng')({optimizationLevel: 7})],
      },
    ],
    './snowpack/plugin-compile-web-modules.js',
    './snowpack/plugin-terser.js',
  ],
}
