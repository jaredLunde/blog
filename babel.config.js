module.exports = (api) => {
  return {
    presets: [
      api.env('test') && '@babel/preset-env',
      [
        '@babel/preset-react',
        {
          useSpread: true,
        },
      ],
      '@babel/preset-typescript',
    ].filter(Boolean),
    plugins: [
      'babel-plugin-transform-node-env-inline',
      '@babel/plugin-syntax-import-meta',
      'macros',
      api.env('production') && 'optimize-react',
      [
        'dash',
        {
          instances: {
            // Transforms based on the `default` export in `src/styles`
            // i.e. import styles from './styles'
            styles: {'./src/design-system/styles': 'styles'},
            responsive: {'./src/design-system/styles': 'responsiveStyles'},
            // If using @dash-ui/mq
            // Transforms based on the `default` export in `src/mq`
            // i.e. import mq from './mq'
            mq: {'./src/design-system/mq': 'mq'},
          },
        },
      ],
      api.env('production') &&
        '@babel/plugin-transform-react-constant-elements',
    ].filter(Boolean),
  }
}
