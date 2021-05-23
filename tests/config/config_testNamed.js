const nexssConfig = require('../../src/config')

const configNamed = nexssConfig({ type: 'yaml', name: 'myconfigName' })

module.exports = { configNamed }
