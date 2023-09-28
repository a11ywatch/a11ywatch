use crate::options::sub_command::Commands;
use clap::Parser;

/// program to build, deploy, integrate, and run A11yWatch and A11yWatch Lite.
#[derive(Parser)]
#[clap(author, version, about, long_about = None)]
pub struct Cli {
    /// Build main sub commands
    #[clap(subcommand)]
    pub command: Option<Commands>,
    /// Set the API token to use for requests
    #[clap(short, long)]
    pub set_token: Option<String>,
    /// Clear the API token to use for requests
    #[clap(short, long)]
    pub clear_token: bool,
    /// Set the Computer Vision API token to use for request
    #[clap(long)]
    pub set_cv_token: Option<String>,
    /// Enable recording audits to a directory
    #[clap(long)]
    pub set_recording: Option<String>,
    /// Clear the recording preventing storing video
    #[clap(long)]
    pub clear_recording: bool,
    /// Clear the Computer Vision API token to use for request
    #[clap(long)]
    pub clear_cv_token: bool,
    /// Set the Computer Vision API endpoint to use for request
    #[clap(long)]
    pub set_cv_url: Option<String>,
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
    #[clap(short = 'R', long)]
    pub results_parsed: bool,
    /// Get results of the github html message
    #[clap(long)]
    pub results_parsed_github: bool,
    /// Get results file parsed as report list of passed / failed
    #[clap(short, long)]
    pub results_parsed_list: bool,
    /// Get the total amount of issues between errors,warning,notice that occurred for the result set.
    #[clap(long)]
    pub results_issues: bool,
    /// Get the total amount of issues of type error from result set.
    #[clap(long)]
    pub results_issues_errors: bool,
    /// Get the total amount of issues of type warning from result set.
    #[clap(long)]
    pub results_issues_warnings: bool,
    /// Get the apps tmp directory location
    #[clap(long)]
    pub find_tmp_dir: bool,
}
