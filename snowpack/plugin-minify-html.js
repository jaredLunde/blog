/* eslint-disable @typescript-eslint/no-var-requires */
const {promises: fs} = require('fs')
const {promisify} = require('util')
const glob = promisify(require('glob'))
const {minify} = require('html-minifier')

module.exports = function plugin(_, minifyOptions = {}) {
  return {
    name: 'snowpack-plugin-minify-html',
    async optimize({buildDirectory}) {
      const files = await glob('**/*.html', {
        cwd: buildDirectory,
        absolute: true,
      })

      const fileContents = await Promise.all(
        files.map((file) => fs.readFile(file, 'utf-8'))
      )

      await Promise.all(
        fileContents.map((file, i) =>
          fs.writeFile(
            files[i],
            minify(file, {
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              sortAttributes: true,
              useShortDoctype: true,
              removeRedundantAttributes: true,
              removeComments: true,
              removeAttributeQuotes: true,
              collapseWhitespace: true,
              collapseInlineTagWhitespace: true,
              collapseBooleanAttributes: true,
              ...minifyOptions,
            })
          )
        )
      )
    },
  }
}
