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
      for (const file of await glob('**/*.js', {
        cwd: buildDirectory,
        absolute: true,
      })) {
        const fileContents = await fs.readFile(file, 'utf-8')
        try {
          await fs.writeFile(
            file,
            (
              await minify(fileContents, {
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
              })
            ).code
          )
        } catch (err) {
          console.log(file)
          throw err
        }
      }
    },
  }
}
/**
 * This is a mapping of glob patterns and their sharp methods
 * and options. See the Sharp documentation for a complete list of
 * methods and their respective options.
 *
 * @see https://sharp.pixelplumbing.com/api-output
 */
