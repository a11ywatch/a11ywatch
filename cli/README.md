# a11ywatch-cli

CLI tool to manage all things required BETA. View the [cli-docs](https://docs.a11ywatch.com/documentation/cli/) for more complete info.

## Build

build a11ywatch via docker on any machine. Get started by making sure you have Rust installed and running the command below. You can run the [`setup-terraform-unix.sh`](../build/setup-terraform-unix.sh) in the parent build folder to also bootstrap the required modules on your machine.

```sh
cargo install a11ywatch_cli
```

### Supported Architectures

Supported archs are amd64 and arm64.

### Deploy

The deployment infra is handled via terraform. The terraform code will be installed seperate outside of the crate.
If you cloned the repo make sure to adjust the `variables.tf` file in the terraform folder with your [GCP](https://cloud.google.com/) creds.
The default remote target is [GCP](https://cloud.google.com/) for the CLI. At A11yWatch we use AWS Fargate in production and do not have this automated yet for the CLI. We are testing out and rolling different remote providers to target. You can launch a11ywatch inside any machine that supports docker by also installing the CLI on the server and then running `a11ywatch start`.
