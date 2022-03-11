pub mod options;
pub mod generators;
pub mod commands;
pub mod launchers;
pub mod fs;
pub mod utils;

use clap::{Parser};
use std::env;
use serde_json::json;
use options::{Cli, Commands};
use commands::{Build, Start, Stop, Deploy, ApiClient};
use fs::temp::{TempFs};

const INCLUDE_FRONTEND: &str = "INCLUDE_FRONTEND";
const EXTERNAL: &str = "EXTERNAL";

fn main() {
    let cli = Cli::parse();

    if cli.find_results {
        let file_manager = TempFs::new();
        println!("{}", &file_manager.results_file);
    }

    match &cli.command {
        Some(Commands::BUILD { frontend, local }) => {
            env::set_var(INCLUDE_FRONTEND, frontend.to_string());
            Build::process(&local);
        },
        Some(Commands::START { frontend, local }) => {
            env::set_var(INCLUDE_FRONTEND, frontend.to_string());
            Start::process(&local);
        },
        Some(Commands::STOP { frontend, local }) => {
            env::set_var(INCLUDE_FRONTEND, frontend.to_string());
            Stop::process(&local);
        },
        Some(Commands::DEPLOY { frontend, all, backend }) => {
            if !frontend && !backend {
                Deploy::process(&all);
            }
        },
        Some(Commands::TERMINATE { frontend, all, backend }) => {
            if !frontend && !backend {
                Deploy::process_terminate(&all);
            }
        },
        Some(Commands::SCAN { url, external, save }) => {
            env::set_var(EXTERNAL, external.to_string());
            let result = ApiClient::scan_website(&url);
            let json_results = json!(result.unwrap());

            if *save {
                let mut file_manager = TempFs::new();
                file_manager.save_results(&json_results).unwrap();
            }
            println!("{}", &json_results);
        },
        Some(Commands::EXTRACT { platform }) => {
            if platform == "github" {
                println!("format message for github");
            }
        },
        None => {}
    }
}