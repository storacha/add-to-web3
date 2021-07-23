<h1 align="center">⁂<br/>web3.storage</h1>
<p align="center">Add a directory to web3.storage from an Action, and output it's IPFS Content ID.</p>

## Example usage

```yaml
uses: web3-storage/add-to-web3@v1
id: web3
with:
  web3_token: ${{ secrets.WEB3_STORAGE_TOKEN }}
  path_to_add: 'dist'

# "bafkreicysg23kiwv34eg2d7qweipxwosdo2py4ldv42nbauguluen5v6am"
- run: echo ${{ steps.web3.outputs.cid }}

# "https://dweb.link/ipfs/bafkreicysg23kiwv34eg2d7qweipxwosdo2py4ldv42nbauguluen5v6am"
- run: echo ${{ steps.web3.outputs.url }}
```

## Inputs

### `path_to_add`

**Required** The path the root directory of your static website or other content that you want to publish to IPFS.

### `web3_token`

**Required** API token for web3.storage

### `web3_api`

_Default_ `https://api.web3.storage`

**Required** API URL for web3.storage

### `wrap_with_directory`

_Default_ `false`

**Required** Should the `path_to_add` be wrapped in a diretory when creating the IPFS DAG. For most folks using this, the default of `false` is fine. If you want to add a single file and preserve the filename in the IPFS DAG you may want to set it to `true`.'

## Outputs

### `cid`

The IPFS content ID for the directory on IPFS. 
e.g. `bafkreicysg23kiwv34eg2d7qweipxwosdo2py4ldv42nbauguluen5v6am`

### `url`

The IPFS gateway URL for the directory 
e.g. `https://dweb.link/ipfs/bafkreicysg23kiwv34eg2d7qweipxwosdo2py4ldv42nbauguluen5v6am`


## Contibuting

💌 Considerate contributions welcome! 

*Of note* This is supposed to be a Javascript flavour GitHub Action, but the JS runner is [stuck on node12](https://github.com/actions/runner/issues/772v), and we need at least node14. Until the glorious future where the current node version is supported, we wrap the action in a container.

The `dist` folder is commited to the repo as is the curious cultural norm with JS actions, as the repo is the delivery mechanism, so to spare some cycles for the user users, all the deps are bundled into a single /dist/index.js monolith. This no longer makes much sense as we're also wrapping it in a container, but the dream is that the new node16 runner lands, and we can just delete the Dockers and move on.

<h3 align="center"><a href="https://web3.storage">⁂</a></h3>