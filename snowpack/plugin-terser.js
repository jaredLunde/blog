/* eslint-disable @typescript-eslint/no-var-requires */
const {promises: fs} = require('fs')
const {promisify} = require('util')
const glob = promisify(require('glob'))
const {minify} = require('terser')

module.exports = function plugin(_, terserOptions) {
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
            (await minify(fileContents, {safari10: true})).code
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
