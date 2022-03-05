# a11ywatch-cli

CLI tool to manage all things required.

## Build

build a11ywatch via docker on any machine. Get started by making sure you have Rust installed and running the command below. You can run the [`setup-terraform-unix.sh`](../build/setup-terraform-unix.sh) in the parent build folder to also bootstrap the required modules on your machine.

```sh
cargo install a11ywatch_cli
```

### Commands

exact options comming soon and `--deploy` command WIP. At the moment after installing the cli, please clone the project and navigate to the folder to run the commands ( This will be removed soon ). Run `a11ywatch --help` to get all options and arguements.

```sh
a11ywatch --build
a11ywatch --deploy
a11ywatch --run
```

### Supported Architectures

Supported archs are amd64 and arm64.

### Deploy

The deployment infra is handled via terraform. The terraform code will be installed seperate outside of the crate.
If you cloned the repo make sure to adjust the `variables.tf` file in the terraform folder with your GCP creds.
