# a11ywatch-cli

CLI tool to manage all things required BETA. View the [cli-docs](https://docs.a11ywatch.com/documentation/cli/) for more complete info.

## Build

Launch A11yWatch using docker on any machine. Get started by making sure you have [Rust](https://www.rust-lang.org/tools/install) installed and running the command below. By default all paid features are enabled for all users when running on your own instance locally.

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

### Deploy

The deployment infra is handled via terraform. The terraform code will be installed seperate outside of the crate.
If you cloned the repo make sure to adjust the `variables.tf` file in the terraform folder with your [GCP](https://cloud.google.com/) creds.
The default remote target is [GCP](https://cloud.google.com/) for the CLI. At A11yWatch we use AWS Fargate in production and do not have this automated yet for the CLI. We are testing out and rolling different remote providers to target. You can also launch a11ywatch inside any machine that supports docker by also installing the CLI on the server and then running `a11ywatch start`.
