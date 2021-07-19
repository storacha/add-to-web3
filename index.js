const { filesFromPath } = require('files-from-path')
const { Web3Storage } = require('web3.storage')
const core = require('@actions/core')

async function run () {
  try {
    const pathToAdd = core.getInput('path_to_add')
    const endpoint = new URL(core.getInput('web3_api'))
    const token = core.getInput('web3_token')
    const web3 = new Web3Storage({ endpoint, token })

    core.info(`Adding ${pathToAdd} to ${endpoint.origin}`)
    const name = `${GITHUB_REPOSITORY.replace('/', '-')}-${GITHUB_SHA.substring(0,8)}`
    const cid = await web3.put(filesFromPath(`${pathToAdd}/**`), { name })
    const url = `https://dweb.link/ipfs/${cid}`
    core.info(url)
    core.setOutput('cid', cid)
    core.setOutput('url', cid)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
