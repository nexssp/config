const nexssConfig = require('../src/config')

const config1 = nexssConfig({ type: 'json' })

const configPath = config1.findParent('_nexss.yml')

config1.save({ myfile: 1, nest: [1, 2] }, configPath)

console.log(config1.load(configPath))