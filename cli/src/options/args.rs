use clap::{Parser};
use crate::options::sub_command::Commands;

/// program to build, deploy, and run a11ywatch.
#[derive(Parser)]
#[clap(author, version, about, long_about = None)]
pub struct Cli {
    /// Build sub commands
    #[clap(subcommand)]
    pub command: Option<Commands>,
}
