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

          if (code) {
            // Some Babel plugins assume process.env exists, but Snowpack
            // uses import.meta.env instead. Handle this here since it
            // seems to be pretty common.
            // See: https://www.pika.dev/npm/snowpack/discuss/496
            code = code.replace(/process\.env/g, 'import.meta.env')
          }

          return fs.writeFile(file, code)
        })
      )
    },
  }
}
