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
    '@pages': './src/pages/index.tsx',
    '@assets': './src/assets',
  },
  exclude: [
    '**/node_modules/**',
    '**/test/**',
    '**/.storybook/**',
    '**/coverage/**',
    '**/__fixtures__/**',
    '**/*.@(spec|test|stories).@(ts|tsx|js|jsx|mjs)',
  ],
  plugins: [
    '@snowpack/plugin-react-refresh',
    'snowpack-plugin-mdx',
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
  ],
}
