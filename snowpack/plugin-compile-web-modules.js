/* eslint-disable @typescript-eslint/no-var-requires */
const {promises: fs} = require('fs')
const {promisify} = require('util')
const glob = promisify(require('glob'))
const babel = require('@babel/core')

module.exports = function plugin() {
  return {
    name: 'snowpack-plugin-compile-web-modules',
    async optimize({buildDirectory}) {
      const files = await glob('**/web_modules/**/*.js', {
        cwd: buildDirectory,
        absolute: true,
      })

      const t = await Promise.all(
        files.map((file) =>
          babel.transformFileAsync(file, {
            cwd: process.cwd(),
            filename: file,
            ast: false,
            compact: false,
            plugins: ['babel-plugin-transform-node-env-inline'],
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  targets: {
                    // These are the browsers that support ESM
                    browsers: [
                      'Chrome >= 61',
                      'Safari >= 10.1',
                      'iOS >= 10.3',
                      'Firefox >= 60',
                      'Edge >= 16',
                    ],
                  },
                },
              ],
            ],
          })
        )
      )

      await Promise.all(
        files.map((file, i) => {
          let {code} = t[i]
          return fs.writeFile(file, code)
        })
      )
    },
  }
}
