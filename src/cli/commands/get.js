module.exports = () => {
  const cliArgs = require('minimist')(process.argv.slice(2))
  const NEXSS_PROJECT_CONFIG_PATH = process.env.NEXSS_PROJECT_CONFIG_PATH
  const { config1 } = require('../../config/config')
  let configContent
  if (cliArgs.configPath) {
    if (fs.existsSync(`${cliArgs.configPath}/_nexss.yml`)) {
      try {
        configContent = config1.load(`${cliArgs.configPath}/_nexss.yml`)
      } catch (error) {
        console.log('This is not nexss PROGRAMMER project.')
      }
    } else {
      log.warn(`This is not Nexss PROGRAMMER Project.`)
      process.exit(0)
    }
  } else {
    configContent = config1.load(NEXSS_PROJECT_CONFIG_PATH)
  }

  if (!configContent) {
    log.warn(`This is not Nexss PROGRAMMER Project.`)
    process.exit(0)
  }

  if (cliArgs.json) {
    if (cliArgs.select) {
      if (!configContent[cliArgs.select]) {
        console.log(`{}`)
      } else {
        console.log(JSON.stringify(configContent[cliArgs.select], null, 2))
      }
    } else {
      console.log(JSON.stringify(configContent, null, 2))
    }
  } else {
    console.log(configContent)
  }
  return true
}
