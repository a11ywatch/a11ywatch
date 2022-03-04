pub mod args;

use args::parse_args;
use std::process::Command;

fn main() {
    let options = parse_args(std::env::args());

    if options.contains_key("build") {
        println!("build: starting the application via docker...");
        let output = Command::new("docker-compose")
            .args(["up", "-d"])
            .output()
            .expect("Failed to execute command");

        println!("{:?}. Docker containers started", output);
    }

    // launch deploy via terraform
    if options.contains_key("deploy") {
        println!("deploy: deploying infrastructure running");
    }

    // start application
    if options.contains_key("run") {
        let output = Command::new("docker-compose")
            .args(["run", &options["run"].to_string()])
            .output()
            .expect("Failed to execute command");

        println!("{:?}. Ran command to docker container", output);
    }

}