extern crate dirs;
extern crate env_logger;
extern crate htr;

pub mod commands;
pub mod formatters;
pub mod fs;
pub mod generators;
pub mod launchers;
pub mod options;
pub mod rpc;
pub mod utils;

#[macro_use]
extern crate lazy_static;

use self::formatters::{
    format_body, format_github_body, results_issues_count, results_issues_errors_count,
    results_issues_warnings_count, results_list_to_string, results_to_string,
    results_to_string_github,
};

use crate::utils::Issue;
use clap::Parser;

use commands::{ApiClient, Build, Start, Stop};

use fs::TempFs;
use options::{Cli, Commands};
use serde_json::json;
use std::env;
use std::io::{self, Write};

const INCLUDE_FRONTEND: &str = "INCLUDE_FRONTEND";
const EXTERNAL: &str = "EXTERNAL";
const BUN: &str = "BUN"; // bun runtime

fn main() {
    let cli = Cli::parse();
    let mut file_manager = TempFs::new();

    let api_token = cli.set_token.unwrap_or_default();
    let cv_token = cli.set_cv_token.unwrap_or_default();
    let cv_url = cli.set_cv_url.unwrap_or_default();

    if !api_token.is_empty() {
        file_manager.set_token(&api_token).unwrap();
        io::stdout()
            .write_all(&"API token saved".as_bytes())
            .unwrap();
    }

    if !cv_token.is_empty() {
        file_manager.set_cv_token(&cv_token).unwrap();
    }

    if !cv_url.is_empty() {
        file_manager.set_cv_url(&cv_url).unwrap();
    }

    if cli.find_results {
        println!("{}", &file_manager.results_file);
    }

    if cli.github_results_path {
        println!("{}", &file_manager.results_github_file);
    }

    if cli.find_tmp_dir {
        println!("{}", &file_manager.get_temp_dir());
    }

    if cli.github_api_url {
        use self::utils::get_api;
        println!("{}", &get_api());
    }

    if cli.results_parsed {
        println!("{}", results_to_string(&file_manager));
    }

    if cli.results_parsed_github {
        println!("{}", results_to_string_github(&file_manager));
    }

    if cli.results_parsed_list {
        println!("{}", results_list_to_string(&file_manager));
    }

    if cli.results_issues {
        let count = results_issues_count(&file_manager);

        println!("{}", count);
    }

    if cli.results_issues_errors {
        let count = results_issues_errors_count(&file_manager);

        println!("{}", count);
    }

    if cli.results_issues_warnings {
        let count = results_issues_warnings_count(&file_manager);

        println!("{}", count);
    }

    match &cli.command {
        Some(Commands::BUILD {
            frontend,
            local,
            standalone,
            upgrade,
        }) => {
            env::set_var(INCLUDE_FRONTEND, frontend.to_string());
            if *upgrade {
                Build::upgrade(&local, &standalone);
            }
            Build::process(&local, &standalone);
        }
        Some(Commands::START {
            frontend,
            local,
            upgrade,
            standalone,
            bun,
        }) => {
            env::set_var(INCLUDE_FRONTEND, frontend.to_string());
            env::set_var(BUN, bun.to_string());

            if *upgrade {
                Build::upgrade(&local, &standalone);
            }
            Start::process(&local, &standalone);
        }
        Some(Commands::STOP { frontend, local }) => {
            env::set_var(INCLUDE_FRONTEND, frontend.to_string());
            Stop::process(&local);
        }
        Some(Commands::SCAN {
            url,
            external,
            save,
            fix,
            noout,
        }) => {
            if *external {
                env::set_var(EXTERNAL, external.to_string());
            };

            let result = ApiClient::scan_website(&url, &file_manager).unwrap_or_default();
            let json_results = json!(&result);

            if *save {
                file_manager.save_results(&json_results).unwrap();
            };

            if *fix {
                fs::code_fix::apply_fix(&json_results);
            };

            if !noout {
                println!("{}", json_results)
            };
        }
        Some(Commands::CRAWL {
            url,
            external,
            save,
            subdomains,
            tld,
            norobo,
            fix,
            debug,
            noout,
            sitemap,
        }) => {
            if *external {
                env::set_var(EXTERNAL, external.to_string());
            }
            if *debug {
                env::set_var("RUST_LOG", "a11ywatch::rpc::client=debug");
                env_logger::init();
            }
            let result =
                ApiClient::crawl_website(&url, subdomains, tld, norobo, &file_manager, sitemap)
                    .unwrap_or_default();
            let json_results = json!(result);

            if *save {
                TempFs::new().save_results(&json_results).unwrap();
            };

            if *fix {
                fs::code_fix::apply_fix(&json_results);
            };

            if !noout {
                println!("{}", json_results)
            };
        }
        Some(Commands::EXTRACT { platform, list }) => {
            if platform == "github" {
                // list report as pass fail list
                if *list {
                    let results = results_list_to_string(&file_manager);
                    let report_message = utils::format_results(results);
                    let json_data = format_github_body(&report_message, &report_message);
                    file_manager
                        .save_github_results(&json_data)
                        .unwrap_or_default();

                    println!("{}", json_data);
                } else {
                    let json_data = format_body(&file_manager, cli.github_results_path);
                    println!("{}", json_data);
                }
            }
        }
        None => {}
    }
}
