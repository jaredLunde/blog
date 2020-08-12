/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

var _micromatch = /*#__PURE__*/ _interopRequireDefault(
  /*#__PURE__*/ require('micromatch')
)

var _sharp = /*#__PURE__*/ _interopRequireDefault(
  /*#__PURE__*/ require('sharp')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = function plugin(_, images) {
  return {
    name: 'snowpack-plugin-resize-images',
    async transform({contents, filePath}) {
      let base

      for (const globPattern in images) {
        if (_micromatch.default.isMatch(filePath, globPattern)) {
          base = base || (0, _sharp.default)(Buffer.from(contents, 'binary'))
          const methods = images[globPattern]

          for (const method in methods) {
            const methodOptions = methods[method]

            if (Array.isArray(methodOptions)) {
              // eslint-disable-next-line @typescript-eslint/no-extra-semi
              base[method](...methodOptions)
            } else {
              // eslint-disable-next-line @typescript-eslint/no-extra-semi
              base[method](methodOptions)
            }
          }
        }
      }

      if (base) {
        return (await base.toBuffer()).toString('binary')
      }

      return contents
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
