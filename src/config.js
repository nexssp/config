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

function nexssConfig({ type = 'yaml' } = {}) {
  const supportedTypes = ['json', 'yaml']
  if (!supportedTypes.includes(type)) {
    const { error } = require('@nexssp/logdebug')
    error(`For now nexssConfig only supports: ${supportedTypes.join(', ')}`)
  }

  require('@nexssp/extend')(type)

  let _fs = require('fs')
  const start = () => {
    return true
  }

  function load(filePath) {
    let file
    if (!filePath) {
      file = findParent(type === 'yaml' ? '_nexss.yml' : '_nexss.json')
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

  function getPath() {
    return findParent('_nexss.yml')
  }

  function save(content, filePath) {
    delete content.filePath
    const objectToString = type === 'yaml' ? content.YAMLstringify() : content.JSONstringify()

    if (!filePath) {
      const extension = type === 'yaml' ? 'yml' : 'json'
      filePath = findParent(`_nexss.${extension}`, `_nexss.${extension}`)
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

  return {
    findParent,
    getPath,
    start,
    load,
    save,
  }
}

module.exports = nexssConfig
