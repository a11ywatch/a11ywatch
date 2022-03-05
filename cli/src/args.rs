use clap::Parser;

/// program to build, deploy, and run a11ywatch.
#[derive(Parser, Debug, PartialEq)]
#[clap(author, version, about, long_about = None)]
pub struct Cli {

    /// Build the project on the local machine.
    #[clap(short, long)]
    pub build: bool,

    /// Start the application on the local machine.
    #[clap(short, long)]
    pub up: bool,

    /// Run a one off container on the local machine.
    #[clap(short, long, default_value = "")]
    pub run: String,

    /// Deploy the build on remote infrastructure.
    #[clap(short, long)]
    pub deploy: bool,

    /// Destroy the build on remote infrastructure.
    #[clap(short, long)]
    pub terminate: bool,
}
