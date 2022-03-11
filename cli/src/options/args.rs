use clap::{Parser};
use crate::options::sub_command::Commands;

/// program to build, deploy, integrate, and run a11ywatch.
#[derive(Parser)]
#[clap(author, version, about, long_about = None)]
pub struct Cli {
    /// Build main sub commands
    #[clap(subcommand)]
    pub command: Option<Commands>,
    /// Log file results path
    #[clap(short, long)]
    pub find_results: bool,
    /// Get github API endpoint of project
    #[clap(short, long)]
    pub github_api_url: bool,
}
