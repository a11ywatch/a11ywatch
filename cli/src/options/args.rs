use clap::{Parser};
use crate::options::sub_command::Commands;

/// program to build, deploy, integrate, and run a11ywatch.
#[derive(Parser)]
#[clap(author, version, about, long_about = None)]
pub struct Cli {
    /// Build main sub commands
    #[clap(subcommand)]
    pub command: Option<Commands>,
    ///Set the API token to use for request
    #[clap(short, long)]
    pub set_token: Option<String>,
    /// Log file results path
    #[clap(short, long)]
    pub find_results: bool,
    /// Log file results github path
    #[clap(long)]
    pub github_results_path: bool,
    /// Get github API endpoint of project
    #[clap(short, long)]
    pub github_api_url: bool,
    /// Get results file parsed to json
    #[clap(short, long)]
    pub results_parsed: bool,
    /// Get results of the github html message
    #[clap(long)]
    pub results_parsed_github: bool,
    /// Get amount of issues occured for the results.
    #[clap(long)]
    pub results_issues: bool,
    /// Get the apps tmp directory location
    #[clap(long)]
    pub find_tmp_dir: bool,
}
