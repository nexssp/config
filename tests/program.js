const nexssConfig = require('../src/config')

const config1 = nexssConfig({ type: 'json' })
// config1.save({ myfile: 1, nest: [1, 2] })

const config2 = nexssConfig({ type: 'yaml', name: 'mysecond' })
// config2.save({ myfile: 2, aaaaaaaaaa: [1, 2] })

// config1.set('a', 'works!!!! config111')
// config1.set('b', 'works!!!! config111')
config1.set('x.y.z.y', 'works!!!! set nested!!')

config2.assign({
  xxxxx222x1xx: 'yyyyyyyyyyy',
  obj1: { nested: 'assignworks!!!!!!! configb', nested2: { nessss: 'aAAAAAAAAAAAAAA' } },
})
console.log(config1.load())
console.log(config2.load())

console.log(config2.get('obj4.nested2.nessss'))

console.log(config2.set('obj5.nested2.nessss', 'IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII'))

console.log(config2.load())
