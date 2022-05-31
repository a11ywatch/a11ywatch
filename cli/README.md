# a11ywatch-cli

The A11yWatch Command Line Interface. View the [cli-docs](https://docs.a11ywatch.com/documentation/cli/) for more complete info.

## Build

Get the CLI by running the command below.

```sh
cargo install a11ywatch_cli
```

Then run `a11ywatch -h` to get all options.

```sh
# start the instance. If you need the front-end client passing the -f option [min of 2.25 gb of memory required alloc to docker resource]
a11ywatch start
# scan a website and pipe the stdout to a file
a11ywatch scan --url https://a11ywatch.com > results.json
```

If you experience issues the `cargo install a11ywatch_cli` command, try running `rustup update stable` to make sure your cargo version is up to date.

### Supported Architectures

Supported archs are amd64 and arm64.

### BETA

The following commands are currently in BETA and require you to have the repo locally [tf-provider](https://github.com/A11yWatch/terraform-provider) and set to your directory.

1. deploy (TERRAFORM)
1. destroy (TERRAFORM)

The scan sub command with the runner option and the remote deployment commands are a work in progress. You may experience issues with the sub commands, feel free to leave an issue when found. In general the CLI is in BETA and may contain breaking changes until v1.
