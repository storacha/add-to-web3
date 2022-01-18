const core = require('@actions/core')
const { addToWeb3, pickName } = require('./web3')

async function run () {
  try {
    const name = pickName({
      repo: process.env.GITHUB_REPOSITORY,
      run: process.env.GITHUB_RUN_NUMBER,
      sha: process.env.GITHUB_SHA
    })
    const endpoint = new URL(core.getInput('web3_api'))
    const pathToAdd = core.getInput('path_to_add')
    const token = core.getInput('web3_token')
    const includeHidden = core.getInput('include_hidden')
    const wrapWithDirectory = core.getBooleanInput('wrap_with_directory')
    core.info(`Adding ${pathToAdd} to ${endpoint.origin}`)
    const { cid, url } = await addToWeb3({ endpoint, token, name, pathToAdd, wrapWithDirectory, includeHidden })
    core.info(url)
    core.setOutput('cid', cid)
    core.setOutput('url', url)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
