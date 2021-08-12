// structure-barista package specific overrides
module.exports = {
  // we inherit upstream configs by saying root: false
  root: false,
  rules: {
    'import/named': 0, // We do not want these failing in CI from no installs
  },
};
