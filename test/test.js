// This contains an integration test that uploads the fixtures dir to web3.storage
// You need to set the env var `INPUT_WEB3_TOKEN` to be a valid token for https://api-staging.web3.storage
//
// Example
// ```
// INPUT_WEB3_TOKEN=eyJhbGciO... npm test
// ```
const test = require('ava')
const { addToWeb3, pickName } = require('../web3')
const process = require('process')
const cp = require('child_process')
const path = require('path')

test('pickName', t => {
  const name = pickName({ repo: 'good/one', run: '101', sha: '6a8a00320d3e15207b1c8b161471e5ba78e464e1' })
  t.deepEqual(name, 'good-one-101-6a8a0032')
})

test('addToWeb3', async t => {
  const { cid, url } = await addToWeb3({
    endpoint: new URL('https://api-staging.web3.storage'),
    token: process.env.INPUT_WEB3_TOKEN, // plz set in your env
    pathToAdd: 'test/fixtures',
    name: 'testing add-to-web3'
  })
  t.is(cid, 'bafybeifpw7nrh374rzfcxpaw3bkp6fr7djmujg5wvib6ma7i7n76t3k53q')
  t.is(url, `https://dweb.link/ipfs/${cid}`)
})

// shows how the runner will run a javascript action with env / stdout protocol
test('runs like an action', t => {
  process.env.GITHUB_REPOSITORY = 'good/one'
  process.env.GITHUB_SHA = '6a8a00320d3e15207b1c8b161471e5ba78e464e1'
  process.env.INPUT_PATH_TO_ADD = 'test/fixtures'
  process.env.INPUT_WEB3_API = 'https://api-staging.web3.storage'
  process.env.INPUT_WRAP_WITH_DIRECTORY = 'false'
  // process.env.INPUT_WEB3_TOKEN = <plz set>

  const ip = path.join(__dirname, '..', 'index.js')
  const output = cp.execSync(`node ${ip}`, { env: process.env }).toString()
  // console.log(output)
  t.is(output, `Adding test/fixtures to https://api-staging.web3.storage
https://dweb.link/ipfs/bafybeifpw7nrh374rzfcxpaw3bkp6fr7djmujg5wvib6ma7i7n76t3k53q

::set-output name=cid::bafybeifpw7nrh374rzfcxpaw3bkp6fr7djmujg5wvib6ma7i7n76t3k53q

::set-output name=url::https://dweb.link/ipfs/bafybeifpw7nrh374rzfcxpaw3bkp6fr7djmujg5wvib6ma7i7n76t3k53q
`)
})

test('runs like an action (WRAP_WITH_DIRECTORY="true")', t => {
  process.env.GITHUB_REPOSITORY = 'good/one'
  process.env.GITHUB_SHA = '6a8a00320d3e15207b1c8b161471e5ba78e464e1'
  process.env.INPUT_PATH_TO_ADD = 'test/fixtures'
  process.env.INPUT_WEB3_API = 'https://api-staging.web3.storage'
  process.env.INPUT_WRAP_WITH_DIRECTORY = 'true'
  // process.env.INPUT_WEB3_TOKEN = <plz set>

  const ip = path.join(__dirname, '..', 'index.js')
  const output = cp.execSync(`node ${ip}`, { env: process.env }).toString()
  // console.log(output)
  t.is(output, `Adding test/fixtures to https://api-staging.web3.storage
https://dweb.link/ipfs/bafybeig2girrvm6wjis6xuqaqvoxhfejuk2bwv4bfzpjhlahsume26ufjy

::set-output name=cid::bafybeig2girrvm6wjis6xuqaqvoxhfejuk2bwv4bfzpjhlahsume26ufjy

::set-output name=url::https://dweb.link/ipfs/bafybeig2girrvm6wjis6xuqaqvoxhfejuk2bwv4bfzpjhlahsume26ufjy
`)
})
