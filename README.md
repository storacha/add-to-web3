# add-to-web3

Upload files to web3.storage from a Github Action, and output it's IPFS Content ID.

_A composite github action. It's [just yaml](./action.yml) calling [w3cli](https://github.com/web3-storage/w3cli_

## Example usage

```yaml
uses: web3-storage/add-to-web3@v3
id: w3
with:
  path_to_add: 'dist'
  proof: ${{ secrets.W3_PROOF }}
  secret_key: ${{ secrets.W3_PRINCIPAL }}

# "bafkreicysg23kiwv34eg2d7qweipxwosdo2py4ldv42nbauguluen5v6am"
- run: echo ${{ steps.w3.outputs.cid }}

# "https://bafkreicysg23kiwv34eg2d7qweipxwosdo2py4ldv42nbauguluen5v6am.ipfs.w3s.link"
- run: echo ${{ steps.w3.outputs.url }}
```

## Inputs

### `path_to_add`

**Required** The path the root directory of your static website or other content that you want to publish to IPFS.

### `secret_key`

**Required** The base64 key to use to sign ucan invocations to web3.storage. 

Create one using `w3 key create`. See: https://github.com/web3-storage/w3cli#w3_principal

### `proof`

**Required** A base64 encoded UCAN delegating capabilities the signing key above. 

Create using `w3 delegation create --base64`

<details>
  <summary>Show advanced options: <code>include_hidden</code>, <code>no_wrap</code></summary>

### `include_hidden`

_Default_ `false`

Should hidden files prefixed with a `.` be included when found in the `path_to_add`

see: https://github.com/web3-storage/files-from-path#filesfrompath


### `no_wrap`

_Default_ `false`

Advanced: if `path_to_add` points to a file it will be wrapped in a directory to preserve the filename. To disable that set no_wrap: "true".

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

<h3 align="center"><a href="https://web3.storage">⁂</a></h3>
