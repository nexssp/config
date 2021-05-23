const assert = require('assert')
const nexssConfig = require('../src/config')

// Below must run from @nexssp/test
const testFolder = process.env.NEXSS_TEST_FOLDER_CURRENT
// Lets create new folder
const { createNewTestFolder } = require('@nexssp/test')
const tf = createNewTestFolder()
console.log('Changing folder: ', tf)
process.chdir(tf)

const config1 = nexssConfig({ type: 'json' })

config1.get('x.y.z.y', 'path set') // no file but it will
