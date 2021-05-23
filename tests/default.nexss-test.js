const { configDefault } = require('./config/config_testDefault')

module.exports = {
  defaultTestFunction: 'nSpawn',
  nexsstests: [
    {
      title: 'Config NOT exists',
      type: 'notFileExists',
      params: [
        () => {
          // File shouldnt be created at this point..
          const fileTest = configDefault.getConfigFilename()
          // configDefault.save('my content')
          return fileTest
        },
      ],
    },
    {
      title: 'File exists',
      type: 'fileExists',
      params: [
        () => {
          const fileTest = configDefault.getConfigFilename()
          configDefault.save('my content')
          return fileTest
        },
      ],
    },
    {
      type: 'equal',
      params: [configDefault.getConfigFilename(), /_nexss.yml/],
    },
    {
      title: 'display menu',
      params: ['nexssp-file', /^add\|a/],
    },
  ],
}
