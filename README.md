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


<details>
  <summary>Show advanced input options</summary>


### `web3_api`

Useful for testing against dev deployments.
  
_Default_ `https://api.web3.storage`
  
### `wrap_with_directory`

Should the `path_to_add` be wrapped in a diretory when creating the IPFS DAG. For most folks using this, the default of `false` is fine. If you want to add a single file and preserve the filename in the IPFS DAG you may want to set it to `true`.'
  
_Default_ `false`


</details>

## Outputs

### `cid`

The IPFS content ID for the directory on IPFS. 
e.g. `bafkreicysg23kiwv34eg2d7qweipxwosdo2py4ldv42nbauguluen5v6am`

### `url`

The IPFS gateway URL for the directory 
e.g. `https://dweb.link/ipfs/bafkreicysg23kiwv34eg2d7qweipxwosdo2py4ldv42nbauguluen5v6am`


## Contibuting

💌 Considerate contributions welcome! 

The `dist` folder is commited to the repo as is the curious cultural norm with JS actions, as the repo is the delivery mechanism, so to spare some cycles for the user users, all the deps are bundled into a single /dist/index.js monolith.

<h3 align="center"><a href="https://web3.storage">⁂</a></h3>
