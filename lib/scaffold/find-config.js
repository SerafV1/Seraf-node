'use strict';

var bitcore = require('gltcore-lib');
var $ = bitcore.util.preconditions;
var _ = bitcore.deps._;
var path = require('path');
var fs = require('fs');
var utils = require('../utils');

/**
 * Will return the path and gltcore-node configuration
 * @param {String} cwd - The absolute path to the current working directory
 */
function findConfig(cwd) {
  $.checkArgument(_.isString(cwd), 'Argument should be a string');
  $.checkArgument(utils.isAbsolutePath(cwd), 'Argument should be an absolute path');
  var directory = String(cwd);
  while (!fs.existsSync(path.resolve(directory, 'gltcore-node.json'))) {
    directory = path.resolve(directory, '../');
    if (directory === '/') {
      return false;
    }
  }
  return {
    path: directory,
    config: require(path.resolve(directory, 'gltcore-node.json'))
  };
}

module.exports = findConfig;
