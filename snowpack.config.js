/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  extends: '@snowpack/app-scripts-react',
  devOptions: {
    port: 3000,
  },
  buildOptions: {
    minify: true,
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
    ['snowpack-plugin-svgr', {svgrOptions: {ref: true}}],
    [
      './snowpack-plugin-resize-images',
      {
        '**/*.placeholder.jpg': {
          resize: {
            width: 32,
          },
          blur: [3],
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
