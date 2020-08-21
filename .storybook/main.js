const path = require('path')
const webpack = require('webpack')

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
      '@assets': path.resolve(__dirname, '../src/assets/'),
      '@design-system': path.resolve(__dirname, '../src/design-system/'),
      '@hooks': path.resolve(__dirname, '../src/hooks/'),
    }
    config.module.rules.push({
      test: /\.tsx?$/,
      loader: require.resolve(
        '@snowpack/plugin-webpack/plugins/import-meta-fix'
      ),
    })
    config.plugins.push(
      new webpack.DefinePlugin({
        __SNOWPACK_ENV__: JSON.stringify(process.env),
      })
    )

    return config
  },
}
