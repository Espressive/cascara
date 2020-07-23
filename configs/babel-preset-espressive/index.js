// As of today, our Babel preset should be the same as react-scripts.
// If we decide to extend those presets, that can be done here.
// See https://babeljs.io/docs/en/presets#creating-a-preset

module.exports = () => ({
  presets: [require('babel-preset-react-app')],
});
