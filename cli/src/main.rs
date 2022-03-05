
extern crate clap;
pub mod args;

use clap::{Parser};

use args::Cli;
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

    // // TODO: DETECT IF COMPOSE NEEDS TO BE GENERATED
    if build_target | start_target {
        if *build_target {
            println!("build: starting the application via docker...");    
            Command::new("docker-compose")
                .args(["build"])
                .status()
                .expect("Failed to execute command");
        }
    
        if *start_target {
            println!("up: starting the application via docker...");
            Command::new("docker-compose")
                .args(["up", "-d"])
                .status()
                .expect("Failed to execute command");
        }

        if !options_run.is_empty() {        
            Command::new("docker-compose")
            .args(["up", "-d", &options_run])
            .status()
            .expect("Failed to execute command");
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