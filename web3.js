const { getFilesFromPath } = require('files-from-path')
const { Web3Storage } = require('web3.storage')

async function addToWeb3 ({ endpoint, token, pathToAdd, name }) {
  const web3 = new Web3Storage({ endpoint, token })
  const files = await getFilesFromPath(`${pathToAdd}`)
  const cid = await web3.put(files, { name })
  const url = `https://dweb.link/ipfs/${cid}`
  return { cid, url }
}

function pickName (repo, sha) {
  return `${repo.replace('/', '-')}-${sha.substring(0, 8)}`
}

module.exports.addToWeb3 = addToWeb3
module.exports.pickName = pickName