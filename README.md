<h1 align="center">⁂<br/>web3.storage</h1>
<p align="center">Add a directory to web3.storage from an Action, and output it's IPFS Content ID.</p>

## Example usage

```yaml
uses: 10xHuman/add-to-web3@v2
id: web3
with:
  web3_token: ${{ secrets.WEB3_STORAGE_TOKEN }}
  path_to_add: 'dist'
  file_name:  'test'

# "bafkreicysg23kiwv34eg2d7qweipxwosdo2py4ldv42nbauguluen5v6am"
- run: echo ${{ steps.web3.outputs.cid }}

# "https://dweb.link/ipfs/bafkreicysg23kiwv34eg2d7qweipxwosdo2py4ldv42nbauguluen5v6am"
- run: echo ${{ steps.web3.outputs.url }}
```

## Inputs

### `path_to_add`

**Required** The path the root directory of your static website or other content that you want to publish to IPFS.

### `file_name`

**Required** file name that you want to publish to IPFS.

### `web3_token`

**Required** API token for web3.storage

<details>
  <summary>Show advanced options: <code>wrap_with_directory</code>, <code>include_hidden</code>, <code>web3_api</code></summary>

### `wrap_with_directory`

_Default_ `false`

Should the `path_to_add` be wrapped in a diretory when creating the IPFS DAG. For most folks using this action the default of `false` is fine. 

This is the opposite of the default that web3.storage uses, as this action is commonly used to add a directory that contains a static website to IPFS. In that case you want the path_to_add to become the root cid so you can host your site at `https://<cid>.ipfs.dweb.link` rather than `https://<cid>.ipfs.dweb.link/<path_to_add>`.

If you do want to capture the `path_to_add` path itself in the IPFS DAG then you want to set `wrap_with_directory:true`.

see: https://web3.storage/docs/reference/js-client-library#parameters

### `include_hidden`

_Default_ `false`

Should hidden files prefixed with a `.` be included when found in the `path_to_add`

see: https://github.com/web3-storage/files-from-path#filesfrompath

### `web3_api`

_Default_ `https://api.web3.storage`

Useful for testing against staging deployments by setting to the api origin of your choice.

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
