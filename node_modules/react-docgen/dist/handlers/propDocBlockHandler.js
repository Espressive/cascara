"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = propDocBlockHandler;

var _astTypes = require("ast-types");

var _getMemberValuePath = _interopRequireDefault(require("../utils/getMemberValuePath"));

var _resolveToValue = _interopRequireDefault(require("../utils/resolveToValue"));

var _setPropDescription = _interopRequireDefault(require("../utils/setPropDescription"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function resolveDocumentation(documentation, path, importer) {
  if (!_astTypes.namedTypes.ObjectExpression.check(path.node)) {
    return;
  }

  path.get('properties').each(propertyPath => {
    if (_astTypes.namedTypes.Property.check(propertyPath.node)) {
      (0, _setPropDescription.default)(documentation, propertyPath, importer);
    } else if (_astTypes.namedTypes.SpreadElement.check(propertyPath.node)) {
      const resolvedValuePath = (0, _resolveToValue.default)(propertyPath.get('argument'), importer);
      resolveDocumentation(documentation, resolvedValuePath, importer);
    }
  });
}

function propDocBlockHandler(documentation, path, importer) {
  let propTypesPath = (0, _getMemberValuePath.default)(path, 'propTypes', importer);

  if (!propTypesPath) {
    return;
  }

  propTypesPath = (0, _resolveToValue.default)(propTypesPath, importer);

  if (!propTypesPath) {
    return;
  }

  resolveDocumentation(documentation, propTypesPath, importer);
}