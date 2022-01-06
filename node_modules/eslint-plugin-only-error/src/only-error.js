const eslint = require('eslint')

const LinterPrototype = (eslint.Linter && eslint.Linter.prototype) || eslint.linter
const originalVerify = LinterPrototype.verify

/**
 * Patch the verify method and downgrade the errors to warnings.
 */
function enable () {
  LinterPrototype.verify = function () {
    const messages = originalVerify.apply(this, arguments)
    messages.forEach(message => {
      if (message.severity === 1) {
        message.severity = 2
      }
    })
    return messages
  }
}

/**
 * Remove the patch
 */
function disable () {
  LinterPrototype.verify = originalVerify
}

enable()
module.exports = { enable, disable }
