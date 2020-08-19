/* eslint-disable @typescript-eslint/no-var-requires */
const {promises: fs} = require('fs')
const {promisify} = require('util')
const glob = promisify(require('glob'))
const {minify} = require('terser')

module.exports = function plugin(_, terserOptions) {
  const nameCache = {}

  return {
    name: 'snowpack-plugin-terser',
    async optimize({buildDirectory}) {
      const files = await glob('**/*.js', {
        cwd: buildDirectory,
        absolute: true,
      })

      const fileContents = await Promise.all(
        files.map((file) => fs.readFile(file, 'utf-8'))
      )

      const mins = await Promise.all(
        files.map((file, i) =>
          minify(fileContents[i], {
            module: true,
            toplevel: true,
            nameCache,
            compress: {
              arguments: true,
              booleans_as_integers: true,
              ecma: 2016,
              hoist_funs: true,
              keep_fargs: false,
              passes: 2,
              unsafe_arrows: true,
              unsafe_comps: true,
              unsafe_math: true,
              unsafe_methods: true,
              unsafe_proto: true,
              unsafe_undefined: true,
            },
            mangle: {
              toplevel: true,
            },
            format: {
              comments: false,
              ecma: 2016,
            },
          })
        )
      )

      await Promise.all(
        mins.map((result, i) => fs.writeFile(files[i], result.code))
      )
    },
  }
}
