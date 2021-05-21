module.exports = () => {
  const cliArgs = require('minimist')(process.argv.slice(2))
  const NEXSS_PROJECT_CONFIG_PATH = process.env.NEXSS_PROJECT_CONFIG_PATH
  const { config1 } = require('../../config/config')
  const fs = require('fs')

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
    try {
      let parsedJson
      parsedJson = JSON.parse(cliArgs.json)

      if (cliArgs._[2]) {
        const temp = { ...parsedJson }
        parsedJson = {}
        parsedJson[cliArgs._[2]] = temp
      }
      Object.assign(configContent, parsedJson)

      config1.save(configContent, NEXSS_PROJECT_CONFIG_PATH)
    } catch (e) {
      console.error("JSON couldn't be imported", e)
    }
  } else {
    console.error(
      'Pass -json parameter with json string. See help by command: nexss config set help'
    )
  }
  return true
}
