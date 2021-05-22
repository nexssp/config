'use strict'
/* eslint-disable space-before-function-paren, comma-dangle */

/**
 * Copyright © 2018-2021 Nexss.com / Marcin Polak mapoart@gmail.com. All rights reserved.
 * This source code is governed by MIT license, please check LICENSE file.
 */

/**
 * Config in json and yaml
 * @constructor
 * @param {string} progress - It will show progress of the installations eg. git
 */

function nexssConfig({ type = 'yaml', name = '_nexss', configPath } = {}) {
  const supportedTypes = ['json', 'yaml']
  if (!supportedTypes.includes(type)) {
    const { error } = require('@nexssp/logdebug')
    error(`For now nexssConfig only supports: ${supportedTypes.join(', ')}`)
  }

  require('@nexssp/extend')(type, 'object') // We load also dget, dset functions

  let _fs = require('fs')
  const start = () => {
    return true
  }

  function getFileExtension() {
    return type === 'yaml' ? 'yml' : 'json'
  }

  function getConfigFilename() {
    const fileExtension = getFileExtension()
    const configFilename = `${name}.${fileExtension}`
    return configFilename
  }

  function getPath() {
    if (configPath) {
      return configPath
    }
    const configFilename = getConfigFilename()
    // If cannot find it it will use current folder..
    return findParent(configFilename) || `./${getConfigFilename()}`
  }

  function load(filePath) {
    let file
    if (!filePath) {
      file = getPath()
    } else {
      file = filePath
    }
    if (!file) return undefined

    try {
      const fileContent = _fs.readFileSync(file, 'utf8')
      const content = type === 'yaml' ? fileContent.YAMLparse() : fileContent.JSONparse()
      return content
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error(error.message)
      }
    }
  }

  function save(content, filePath) {
    delete content.filePath
    const objectToString = type === 'yaml' ? content.YAMLstringify() : content.JSONstringify()

    if (!filePath) {
      filePath = getPath()
    }

    try {
      _fs.writeFileSync(filePath, objectToString)
    } catch (e) {
      throw new Error(e.message)
    }
  }

  function findParent(item, deflt) {
    const { statSync } = require('fs')
    const { resolve, join, dirname, parse } = require('path')

    const f = (i) => {
      try {
        if (statSync(i).isFile()) {
          return i
        }
      } catch (error) {
        // console.log(error);
      }

      const parent = dirname(resolve('..', i))
      // console.log(parent);
      if (parse(parent).root === parent) {
        return null || deflt
      }
      return f(join('..', i))
    }

    return f(item)
  }

  function assign(obj, filePath) {
    if (!Object.prototype.toString.call(obj) == '[object Object]') {
      throw new Error('First parameter for the config.assign function must be an object.')
    }
    const config = load(filePath)
    const newConfig = Object.assign({}, config, obj)
    save(newConfig, filePath)
  }

  function set(key, value, filePath) {
    let config = load(filePath)
    // Set by dot notation
    // dot notation set("x.y.z","val")
    if (key.indexOf('.')) {
      config = config.dset(key, value)
    } else {
      config[key] = value
    }

    save(config, filePath)
  }

  function get(key, filePath, deflt) {
    const config = load(filePath)
    // dot notation get("x.y.z")
    if (key.indexOf('.')) {
      return config.dget(key)
    }

    return config[key] || deflt
  }

  return {
    findParent,
    getPath,
    start,
    load,
    save,
    set,
    get,
    assign,
  }
}

module.exports = nexssConfig
