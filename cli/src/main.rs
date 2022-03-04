pub mod args;

use args::parse_args;
use std::process::Command;

fn main() {
    let options = parse_args(std::env::args());

    if options.contains_key("build") {
        println!("build: starting the application via docker...");
        // TODO: GENERATE compose.yml and check if exist
        Command::new("docker-compose")
            .args(["up", "-d"])
            .status()
            .expect("Failed to execute command");
    }

    // start a one off container
    if options.contains_key("run") {
        let run_command = options["run"].to_string();

        if run_command.is_empty() {
            println!("Run command not specified, please target a container. (web, api, mav, pagemind, crawler, cdn-server, or logger");
        } else {
            Command::new("docker-compose")
                .args(["run", &run_command])
                .status()
                .expect("Failed to execute command");
        }

    }
    

    // INFRASTRURE COMMANDS

    // start deploy via terraform
    if options.contains_key("deploy") {
        println!("deploy: deploying infrastructure running...");

        Command::new("./scripts/deploy.sh")
        .status()
        .expect("Failed to execute command. Make sure to be in the root of the a11ywatch project. Full deployment via binary WIP.");
    }

    // launch deploy via terraform
    if options.contains_key("destroy") {
        println!("destroy: destroying infrastructure running...");

        // TODO: ADD CONFIRM PROMPT AND CHECK FOR OPTIONAL SKIP FLAG
        Command::new("./scripts/destroy.sh")
        .status()
        .expect("Failed to execute command. Make sure to be in the root of the a11ywatch project. Full deployment via binary WIP.");
    }

}