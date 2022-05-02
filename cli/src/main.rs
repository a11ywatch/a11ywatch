pub mod options;
pub mod generators;
pub mod commands;
pub mod launchers;
pub mod fs;
pub mod utils;
pub mod formatters;

use self::formatters::{format_body, results_to_string};
use clap::{Parser};
use std::env;
use options::{Cli, Commands};
use commands::{Build, Start, Stop, Deploy, ApiClient};
use fs::temp::{TempFs};
use serde_json::{json};
use std::io::{self, Write};

const INCLUDE_FRONTEND: &str = "INCLUDE_FRONTEND";
const EXTERNAL: &str = "EXTERNAL";

fn main() {
    let cli = Cli::parse();
    let file_manager = TempFs::new();

    let api_token = cli.set_token.unwrap_or_default();

    if !api_token.is_empty() {
        file_manager.set_token(&api_token).unwrap();
        io::stdout().write_all(&"api token saved".as_bytes()).unwrap();
    }

    if cli.find_results {
        println!("{}", &file_manager.results_file);
    }

    if cli.github_api_url {
        use self::utils::get_api;
        println!("{}", &get_api());
    }

    if cli.results_parsed {
       println!("{}", results_to_string(&file_manager));
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
        Some(Commands::SCAN { url, all, external, save }) => {
            env::set_var(EXTERNAL, external.to_string());
            let result = if *all {
                ApiClient::scan_website(&url, &file_manager, "scan-all")
            } else {
                ApiClient::scan_website(&url, &file_manager, "scan-simple")
            };
            let json_results = json!(result.unwrap());

            if *save {
                file_manager.save_results(&json_results).unwrap();
            }

            println!("{}", json_results);
        },
        Some(Commands::EXTRACT { platform }) => {
            if platform == "github" {
                let json_data = format_body(&file_manager);
                println!("{}", json_data);
            }
        },
        // Some(Commands::CRAWL { url, external, save }) => {
        //     env::set_var(EXTERNAL, external.to_string());
        //     // TODO: START FEEDBACK SERVER
        //     let result = ApiClient::crawl_website(&url);
        //     let json_results = json!(result.unwrap());

        //     if *save {
        //         TempFs::new().save_results(&json_results).unwrap();
        //     }
        // },
        None => {}
    }
}