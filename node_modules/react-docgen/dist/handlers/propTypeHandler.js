"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.childContextTypeHandler = exports.contextTypeHandler = exports.propTypeHandler = void 0;

var _astTypes = require("ast-types");

var _getPropType = _interopRequireDefault(require("../utils/getPropType"));

var _getPropertyName = _interopRequireDefault(require("../utils/getPropertyName"));

var _getMemberValuePath = _interopRequireDefault(require("../utils/getMemberValuePath"));

var _isReactModuleName = _interopRequireDefault(require("../utils/isReactModuleName"));

var _isRequiredPropType = _interopRequireDefault(require("../utils/isRequiredPropType"));

var _printValue = _interopRequireDefault(require("../utils/printValue"));

var _resolveToModule = _interopRequireDefault(require("../utils/resolveToModule"));

var _resolveToValue = _interopRequireDefault(require("../utils/resolveToValue"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function isPropTypesExpression(path, importer) {
  const moduleName = (0, _resolveToModule.default)(path, importer);

  if (moduleName) {
    return (0, _isReactModuleName.default)(moduleName) || moduleName === 'ReactPropTypes';
  }

  return false;
}

function amendPropTypes(getDescriptor, path, importer) {
  if (!_astTypes.namedTypes.ObjectExpression.check(path.node)) {
    return;
  }

  path.get('properties').each(propertyPath => {
    switch (propertyPath.node.type) {
      case _astTypes.namedTypes.Property.name:
        {
          const propName = (0, _getPropertyName.default)(propertyPath, importer);
          if (!propName) return;
          const propDescriptor = getDescriptor(propName);
          const valuePath = (0, _resolveToValue.default)(propertyPath.get('value'), importer);
          const type = isPropTypesExpression(valuePath, importer) ? (0, _getPropType.default)(valuePath, importer) : {
            name: 'custom',
            raw: (0, _printValue.default)(valuePath)
          };

          if (type) {
            propDescriptor.type = type;
            propDescriptor.required = type.name !== 'custom' && (0, _isRequiredPropType.default)(valuePath);
          }

          break;
        }

      case _astTypes.namedTypes.SpreadElement.name:
        {
          const resolvedValuePath = (0, _resolveToValue.default)(propertyPath.get('argument'), importer);

          switch (resolvedValuePath.node.type) {
            case _astTypes.namedTypes.ObjectExpression.name:
              // normal object literal
              amendPropTypes(getDescriptor, resolvedValuePath, importer);
              break;
          }

          break;
        }
    }
  });
}

function getPropTypeHandler(propName) {
  return function (documentation, path, importer) {
    let propTypesPath = (0, _getMemberValuePath.default)(path, propName, importer);

    if (!propTypesPath) {
      return;
    }

    propTypesPath = (0, _resolveToValue.default)(propTypesPath, importer);

    if (!propTypesPath) {
      return;
    }

    let getDescriptor;

    switch (propName) {
      case 'childContextTypes':
        getDescriptor = documentation.getChildContextDescriptor;
        break;

      case 'contextTypes':
        getDescriptor = documentation.getContextDescriptor;
        break;

      default:
        getDescriptor = documentation.getPropDescriptor;
    }

    amendPropTypes(getDescriptor.bind(documentation), propTypesPath, importer);
  };
}

const propTypeHandler = getPropTypeHandler('propTypes');
exports.propTypeHandler = propTypeHandler;
const contextTypeHandler = getPropTypeHandler('contextTypes');
exports.contextTypeHandler = contextTypeHandler;
const childContextTypeHandler = getPropTypeHandler('childContextTypes');
exports.childContextTypeHandler = childContextTypeHandler;