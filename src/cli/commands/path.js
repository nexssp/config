module.exports = () => {
  const cliArgs = require('minimist')(process.argv.slice(2))
  const NEXSS_PROJECT_CONFIG_PATH = process.env.NEXSS_PROJECT_CONFIG_PATH
  const { config1 } = require('../../config/config')
  console.log(config1.getPath())
  return true
}
