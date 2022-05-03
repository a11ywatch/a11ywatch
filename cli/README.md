# a11ywatch-cli

The A11yWatch Command Line Interface. View the [cli-docs](https://docs.a11ywatch.com/documentation/cli/) for more complete info.

## Build

Get the CLI by running the command below.

```sh
cargo install a11ywatch_cli
```

Then run `a11ywatch -h` to get all options.

```sh
# start the instance. If you need the front-end client passing the -f option
a11ywatch start
# scan a website and pipe the stdout to a file
a11ywatch scan --url https://a11ywatch.com > results.json
```

### Supported Architectures

Supported archs are amd64 and arm64.

### BETA

The following commands are currently in BETA and may not work on all platforms.

1. deploy (TERRAFORM)
1. destroy (TERRAFORM)
1. scan -r (with runner option)

The scan sub command with the runner option and the remote deployment commands are a work in progress. You may experience issues with the sub commands, feel free to leave an issue when found.

#### Deploy

The deployment infra is handled via terraform. The terraform code will be installed seperate outside of the crate.
If you cloned the repo make sure to adjust the `variables.tf` file in the terraform folder with your [GCP](https://cloud.google.com/) creds.
The default remote target is [GCP](https://cloud.google.com/) for the CLI. At A11yWatch we use AWS Fargate in production and do not have this automated yet for the CLI. We are testing out and rolling different remote providers to target. You can also launch a11ywatch inside any machine that supports docker by also installing the CLI on the server and then running `a11ywatch start`.
