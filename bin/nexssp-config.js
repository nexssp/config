#!/usr/bin/env node
const plugin = require('@nexssp/plugin')
// const _params = require('minimist')(process.argv.slice(2))
const pluginRoot = plugin({ path: `${__dirname}/..`, benchmark:true, ommit: ['format1'] })
pluginRoot.start()

const [, , cmd, ...args] = process.argv

pluginRoot.runCommand(cmd, args)
