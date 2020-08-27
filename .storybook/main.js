const path = require('path')
const webpack = require('webpack')
const snowpackConfig = require('../snowpack.config')

module.exports = {
  stories: [
    '../src/**/stories/*.stories.mdx',
    '../src/**/stories/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: require.resolve('react'),
      'react-dom': require.resolve('react-dom'),
      ...snowpackConfig.alias,
    }
    config.module.rules.push({
      test: /\.[tj]sx?$/,
      loader: [
        require.resolve('@open-wc/webpack-import-meta-loader'),
        require.resolve(
          '@snowpack/plugin-webpack/plugins/proxy-import-resolve'
        ),
      ],
    })
    config.plugins.push(
      new webpack.DefinePlugin({
        __SNOWPACK_ENV__: JSON.stringify(process.env),
      })
    )

    return config
  },
}
