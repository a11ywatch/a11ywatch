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
# if you need to upgrade the instance to new images run with the upgrade flag.
a11ywatch start --upgrade
```

If you experience issues the `cargo install a11ywatch_cli` command, try running `rustup update stable` to make sure your cargo version is up to date.

## ENV

In order to use [Computer Vision](https://azure.microsoft.com/en-us/services/cognitive-services/computer-vision/) for gathering alt tags you need to create an env file with the following vars.

```sh
COMPUTER_VISION_SUBSCRIPTION_KEY=
COMPUTER_VISION_ENDPOINT=
```

### Supported Architectures

Mac, linux, and Windows.

### BETA

The following commands are currently in BETA and require you to have the repo locally [tf-provider](https://github.com/A11yWatch/terraform-provider) and set to your directory.

1. deploy (TERRAFORM)
1. destroy (TERRAFORM)

The scan sub command with the runner option and the remote deployment commands are a work in progress. You may experience issues with the sub commands, feel free to leave an issue when found. In general the CLI is in BETA and may contain breaking changes until v1.
