
extern crate clap;
pub mod options;
pub mod generators;
pub mod commands;
pub mod runtime;
pub mod builders;

use clap::{Parser};
use options::{Cli, Commands};
use commands::{Build, Start, Deploy};
use std::env;

const INCLUDE_FRONTEND: &str = "INCLUDE_FRONTEND";

fn main() {
    let cli = Cli::parse();

    match &cli.command {
        Some(Commands::BUILD { frontend, local }) => {
            env::set_var(INCLUDE_FRONTEND, frontend.to_string());
            Build::process(&local);
        },
        Some(Commands::START { frontend, local }) => {
            env::set_var(INCLUDE_FRONTEND, frontend.to_string());
            Start::process(&local);
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
        None => {}
    }
}