const core = require('@actions/core')
const { addToWeb3, pickName } = require('./web3')

async function run () {
  try {
    core.info(JSON.stringify(process.env))
    const {
      GITHUB_REPOSITORY,
      GITHUB_SHA
    } = process.env
    const endpoint = new URL(core.getInput('web3_api'))
    const token = core.getInput('web3_token')
    const pathToAdd = core.getInput('path_to_add')
    core.info(`Adding ${pathToAdd} to ${endpoint.origin}`)
    const name = pickName(GITHUB_REPOSITORY, GITHUB_SHA)
    const { cid, url } = await addToWeb3({ endpoint, token, name, pathToAdd })
    core.info(url)
    core.setOutput('cid', cid)
    core.setOutput('url', url)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
