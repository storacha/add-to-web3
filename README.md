# add-to-web3

Upload files to [Storacha](https://storacha/network) from a Github Action, and output the IPFS Content ID.

A lightweight wrapper around [the Storacha CLI tool]. As a [composite](https://docs.github.com/en/actions/creating-actions/creating-a-composite-action) github action all it does is configure and call the cli for you. See the steps in [./action.yml](./action.yml).

## Usage

```yaml
uses: storacha/add-to-web3@v4
id: storacha
with:
  path_to_add: 'dist'
  proof: ${{ secrets.STORACHA_PROOF }}
  secret_key: ${{ secrets.STORACHA_PRINCIPAL }}

# use the outputs in subsequent steps
# "bafkreicysg23kiwv34eg2d7qweipxwosdo2py4ldv42nbauguluen5v6am"
- run: echo ${{ steps.storacha.outputs.cid }}

# "https://bafkreicysg23kiwv34eg2d7qweipxwosdo2py4ldv42nbauguluen5v6am.ipfs.w3s.link"
- run: echo ${{ steps.storacha.outputs.url }}
```

### Generating a `secret_key` and `proof`

On your dev machine, use [the Storacha CLI tool] to generate a `secret_key` and `proof` to allow this action to upload to a space.

Install it from npm and login as described here [docs.storacha.network/quickstart](https://docs.storacha.network/quickstart/) then create a key like this:

```shell
# Use the `did` in the input to the next command. 
# Use `key` as your `secret_key` for add_to_web3.
$ storacha key create --json
{
  "did": "did:key:z6Mk...",
  "key": "MgCaT7Se2QX9..."
}
```

Keep the `key` safe. Save it as a secret on your repo.

Copy the `did` for use in the next command. The output is a base64 encoded ucan `proof` that delegates capabilities to `space/blob/add`, `space/index/add`, `filecoin/offer`, and `upload/add` on your current space to the key generated above.

```shell
# Delegate capabilities to the `did` we created above.
$ storacha delegation create did:key:z6Mk... -c space/blob/add -c space/index/add -c filecoin/offer -c upload/add --base64
mAYIEAP8OEaJlcm9vdHOAZ3ZlcnNpb24BwwUBcRIg+oHTbzShh1WzBo9ISkonCW+KAcy/+zW8Zb...
```

The capabilies `space/blob/add`, `space/index/add`, `filecoin/offer`, and `upload/add` are the minimum required to upload files to web3.storage. This proof will not allow that key to list uploads in this space for example.

To recap:

- Use the `key` value from the output of `w3 key create --json` as the `secret_key` for this action.
- Use the `did` value from that output as the audience for `w3 delegation create <audience>` shown above.
- Use the output of `w3 delegation create <audience> --base64` as the `proof` for this action.

## Inputs

### `path_to_add`

**Required** The path the root directory of your static website or other content that you want to publish to IPFS.

### `secret_key`

**Required** The base64 encoded key to use to sign UCAN invocations to web3.storage. 

Create one using `w3 key create`. See: https://github.com/storacha/upload-service/tree/main/packages/cli#storacha_principal

### `proof`

**Required** A base64 encoded UCAN delegating capabilities the signing key above. 

Create a proof using w3cli, delegating `space/blob/add`, `space/index/add`, `filecoin/offer`, and `upload/add`

```shell
$ AUDIENCE_DID="<the DID for secret_key created by `w3 key create`>"
$ storacha delegation create $AUDIENCE_DID  -c space/blob/add -c space/index/add -c filecoin/offer -c upload/add --base64`
```

<details>
  <summary>Show advanced options: <code>hidden</code>, <code>wrap</code></summary>

### `hidden`

_Default_ `false`

Should hidden files prefixed with a `.` be included when found in the `path_to_add`

See: https://github.com/storacha/upload-service/tree/main/packages/cli#storacha-up-path-path

### `wrap`

_Default_ `true`

If `path_to_add` points to a file it will be wrapped in a directory to preserve the filename. To disable that set wrap: "true".

See: https://github.com/storacha/upload-service/tree/main/packages/cli#storacha-up-path-path

</details>

## Outputs

### `cid`

The IPFS content ID for the directory on IPFS. 
e.g. `bafkreicysg23kiwv34eg2d7qweipxwosdo2py4ldv42nbauguluen5v6am`

### `url`

The IPFS gateway URL for the directory 
e.g. `https://storacha.link/ipfs/bafkreicysg23kiwv34eg2d7qweipxwosdo2py4ldv42nbauguluen5v6am`

## Contributing

💌 Considerate contributions welcome!

[the Storacha CLI tool]: https://github.com/storacha/upload-service/tree/main/packages/cli
