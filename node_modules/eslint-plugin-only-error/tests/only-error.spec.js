const { linter } = require('eslint')
const { disable, enable } = require('../src/only-error') // apply patch

describe('eslint-plugin-only-error', () => {
  const config = {
    rules: { semi: 1 } // error on missing `;`
  }
  const sourceCode = 'var foo'
  it('should upgrade warn(1) to error(2)', () => {
    const messages = linter.verify(sourceCode, config)
    expect(messages[0].severity).toBe(2)
  })

  it('can be temporarly disabled', () => {
    disable()
    const messages1 = linter.verify(sourceCode, config)
    expect(messages1[0].severity).toBe(1)
    enable()
    const messages2 = linter.verify(sourceCode, config)
    expect(messages2[0].severity).toBe(2)
  })
})
