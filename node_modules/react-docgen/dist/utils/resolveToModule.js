"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveToModule;

var _astTypes = require("ast-types");

var _match = _interopRequireDefault(require("./match"));

var _resolveToValue = _interopRequireDefault(require("./resolveToValue"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/**
 * Given a path (e.g. call expression, member expression or identifier),
 * this function tries to find the name of module from which the "root value"
 * was imported.
 */
function resolveToModule(path, importer) {
  const node = path.node;

  switch (node.type) {
    case _astTypes.namedTypes.VariableDeclarator.name:
      if (node.init) {
        return resolveToModule(path.get('init'), importer);
      }

      break;

    case _astTypes.namedTypes.CallExpression.name:
      if ((0, _match.default)(node.callee, {
        type: _astTypes.namedTypes.Identifier.name,
        name: 'require'
      })) {
        return node.arguments[0].value;
      }

      return resolveToModule(path.get('callee'), importer);

    case _astTypes.namedTypes.Identifier.name:
    case _astTypes.namedTypes.JSXIdentifier.name:
      {
        const valuePath = (0, _resolveToValue.default)(path, importer);

        if (valuePath !== path) {
          return resolveToModule(valuePath, importer);
        }

        break;
      }

    case _astTypes.namedTypes.ImportDeclaration.name:
      return node.source.value;

    case _astTypes.namedTypes.MemberExpression.name:
      while (path && _astTypes.namedTypes.MemberExpression.check(path.node)) {
        path = path.get('object');
      }

      if (path) {
        return resolveToModule(path, importer);
      }

  }

  return null;
}