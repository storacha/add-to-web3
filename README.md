# Add to web3.storage action

This action adds a directory to web3.storage, and returns it's IPFS Content ID.

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

**Required** API URL for web3.storage
_Default_ `https://api.web3.storage`

## Outputs

### `cid`

The IPFS content ID for the directory on IPFS. 
e.g. `bafkreicysg23kiwv34eg2d7qweipxwosdo2py4ldv42nbauguluen5v6am`

### `url`

The IPFS gateway URL for the directory 
e.g. `https://dweb.link/ipfs/bafkreicysg23kiwv34eg2d7qweipxwosdo2py4ldv42nbauguluen5v6am`

