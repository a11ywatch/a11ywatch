# a11ywatch-cli

CLI tool to manage all things required.

## Build

build a11ywatch via docker on any machine. Get started by making sure you have Rust installed and running the command below.

```sh
cargo install a11ywatch_cli
```

### Commands

exact options comming soon and `--deploy` command WIP.

```sh
a11ywatch --build
a11ywatch --deploy
a11ywatch --run
```

### Supported Architectures

Supported archs are amd64, arm64, m1 chip.

### Deploy

The deployment infra is handled via terraform. The terraform code will be installed seperate outside of the crate.
If you cloned the repo make sure to adjust the `variables.tf` file in the terraform folder with your GCP creds.
