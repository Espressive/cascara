"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = defaultPropsHandler;

var _astTypes = require("ast-types");

var _getPropertyName = _interopRequireDefault(require("../utils/getPropertyName"));

var _getMemberValuePath = _interopRequireDefault(require("../utils/getMemberValuePath"));

var _printValue = _interopRequireDefault(require("../utils/printValue"));

var _resolveToValue = _interopRequireDefault(require("../utils/resolveToValue"));

var _resolveFunctionDefinitionToReturnValue = _interopRequireDefault(require("../utils/resolveFunctionDefinitionToReturnValue"));

var _isReactComponentClass = _interopRequireDefault(require("../utils/isReactComponentClass"));

var _isReactForwardRefCall = _interopRequireDefault(require("../utils/isReactForwardRefCall"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function getDefaultValue(path, importer) {
  let node = path.node;
  let defaultValue;

  if (_astTypes.namedTypes.Literal.check(node)) {
    defaultValue = node.raw;
  } else {
    if (_astTypes.namedTypes.AssignmentPattern.check(path.node)) {
      path = (0, _resolveToValue.default)(path.get('right'), importer);
    } else {
      path = (0, _resolveToValue.default)(path, importer);
    }

    if (_astTypes.namedTypes.ImportDeclaration.check(path.node)) {
      defaultValue = node.name;
    } else {
      node = path.node;
      defaultValue = (0, _printValue.default)(path);
    }
  }

  if (typeof defaultValue !== 'undefined') {
    return {
      value: defaultValue,
      computed: _astTypes.namedTypes.CallExpression.check(node) || _astTypes.namedTypes.MemberExpression.check(node) || _astTypes.namedTypes.Identifier.check(node)
    };
  }

  return null;
}

function getStatelessPropsPath(componentDefinition, importer) {
  const value = (0, _resolveToValue.default)(componentDefinition, importer);

  if ((0, _isReactForwardRefCall.default)(value, importer)) {
    const inner = (0, _resolveToValue.default)(value.get('arguments', 0), importer);
    return inner.get('params', 0);
  }

  return value.get('params', 0);
}

function getDefaultPropsPath(componentDefinition, importer) {
  let defaultPropsPath = (0, _getMemberValuePath.default)(componentDefinition, 'defaultProps', importer);

  if (!defaultPropsPath) {
    return null;
  }

  defaultPropsPath = (0, _resolveToValue.default)(defaultPropsPath, importer);

  if (!defaultPropsPath) {
    return null;
  }

  if (_astTypes.namedTypes.FunctionExpression.check(defaultPropsPath.node) || _astTypes.namedTypes.FunctionDeclaration.check(defaultPropsPath.node)) {
    // Find the value that is returned from the function and process it if it is
    // an object literal.
    const returnValue = (0, _resolveFunctionDefinitionToReturnValue.default)(defaultPropsPath, importer);

    if (returnValue && _astTypes.namedTypes.ObjectExpression.check(returnValue.node)) {
      defaultPropsPath = returnValue;
    }
  }

  return defaultPropsPath;
}

function getDefaultValuesFromProps(properties, documentation, isStateless, importer) {
  properties // Don't evaluate property if component is functional and the node is not an AssignmentPattern
  .filter(propertyPath => !isStateless || _astTypes.namedTypes.AssignmentPattern.check(propertyPath.get('value').node)).forEach(propertyPath => {
    if (_astTypes.namedTypes.Property.check(propertyPath.node)) {
      const propName = (0, _getPropertyName.default)(propertyPath, importer);
      if (!propName) return;
      const propDescriptor = documentation.getPropDescriptor(propName);
      const defaultValue = getDefaultValue(isStateless ? propertyPath.get('value', 'right') : propertyPath.get('value'), importer);

      if (defaultValue) {
        propDescriptor.defaultValue = defaultValue;
      }
    } else if (_astTypes.namedTypes.SpreadElement.check(propertyPath.node)) {
      const resolvedValuePath = (0, _resolveToValue.default)(propertyPath.get('argument'), importer);

      if (_astTypes.namedTypes.ObjectExpression.check(resolvedValuePath.node)) {
        getDefaultValuesFromProps(resolvedValuePath.get('properties'), documentation, isStateless, importer);
      }
    }
  });
}

function defaultPropsHandler(documentation, componentDefinition, importer) {
  let statelessProps = null;
  const defaultPropsPath = getDefaultPropsPath(componentDefinition, importer);
  /**
   * function, lazy, memo, forwardRef etc components can resolve default props as well
   */

  if (!(0, _isReactComponentClass.default)(componentDefinition, importer)) {
    statelessProps = getStatelessPropsPath(componentDefinition, importer);
  } // Do both statelessProps and defaultProps if both are available so defaultProps can override


  if (statelessProps && _astTypes.namedTypes.ObjectPattern.check(statelessProps.node)) {
    getDefaultValuesFromProps(statelessProps.get('properties'), documentation, true, importer);
  }

  if (defaultPropsPath && _astTypes.namedTypes.ObjectExpression.check(defaultPropsPath.node)) {
    getDefaultValuesFromProps(defaultPropsPath.get('properties'), documentation, false, importer);
  }
}