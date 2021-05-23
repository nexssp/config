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
const config2 = nexssConfig({ type: 'yaml', name: 'mysecond' })

config1.set('x.y.z.y', 'path set')

config2.assign({
  xxxxx222x1xx: 'yyyyyyyyyyy',
  obj1: { nested: 'assignworks!!!!!!! configb', nested2: { nessss: 'aAAAAAAAAAAAAAA' } },
})
assert.deepStrictEqual(config1.load(), { x: { y: { z: { y: 'path set' } } } })

assert.deepStrictEqual(config2.load(), {
  xxxxx222x1xx: 'yyyyyyyyyyy',
  obj1: { nested: 'assignworks!!!!!!! configb', nested2: { nessss: 'aAAAAAAAAAAAAAA' } },
})

console.log('CONFIG PATH: ', config2.getPath(), 'CURRENT PATH: ', process.cwd())

assert.deepStrictEqual(config2.get('obj1.nested2.nessss'), 'aAAAAAAAAAAAAAA')

console.log(config2.set('obj5.nested2.nessss', 'IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII'))
assert.deepStrictEqual(config2.get('obj5.nested2.nessss'), 'IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII')
