const { getFilesFromPath } = require('files-from-path')
const { Web3Storage } = require('web3.storage')

async function addToWeb3 ({ endpoint, token, pathToAdd, name, wrapWithDirectory = false, includeHidden }) {
  const web3 = new Web3Storage({ endpoint, token })
  const files = await getFilesFromPath(pathToAdd, { hidden: includeHidden })
  const cid = await web3.put(files, { name, wrapWithDirectory })
  const url = `https://dweb.link/ipfs/${cid}`
  return { cid, url }
}

function pickName ({ repo, run, sha }) {
  return `${repo.replace('/', '-')}-${run}-${sha.substring(0, 8)}`
}

module.exports.addToWeb3 = addToWeb3
module.exports.pickName = pickName
