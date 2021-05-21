# @nexssp/config

Config for not only the Nexss Programmer.

```js
const nexssConfig = require('../src/config')

const config1 = nexssConfig({ type: 'yaml' }) //type can be yaml or json
//find the closest file from current folder, search all parent folders until finds it
const configPath = config1.findParent('_nexss.yml')

config1.save({ myfile: 1, nest: [1, 2] }, configPath)

const configObj = config1.load(configPath)
```
