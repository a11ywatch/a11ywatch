
extern crate clap;

pub mod args;
pub mod commands;

use clap::{Parser};

use args::Cli;

use commands::docker;

use std::process::Command;

fn main() {
    let args = Cli::parse();

    // local
    let build_target = &args.build;
    let start_target = &args.up;
    let options_run = String::from(&args.run);
    // remote
    let options_deploy = &args.deploy;
    let options_terminate = &args.terminate;

    if build_target | start_target {
        if *build_target {
            docker::build_backend();
        }
    
        if *start_target {
            docker::start_backend();
        }

        if !options_run.is_empty() {        
            docker::run_backend(&options_run);
        }
    }

    if *options_deploy {
        println!("deploy: deploying infrastructure running...");
        Command::new("./scripts/deploy.sh")
        .status()
        .expect("Failed to execute command. Make sure to be in the root of the a11ywatch project. Full deployment via binary WIP.");
        // TODO: DEPLOY WEB APP VIA GCR
    }

    if *options_terminate {
        println!("destroy: destroying infrastructure running...");
        // TODO: ADD CONFIRM PROMPT AND CHECK FOR OPTIONAL SKIP FLAG
        Command::new("./scripts/destroy.sh")
        .status()
        .expect("Failed to execute command. Make sure to be in the root of the a11ywatch project. Full deployment via binary WIP.");
    }


}