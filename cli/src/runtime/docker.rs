use std::process::Command;

// TODO: DETECT IF COMPOSE NEEDS TO BE GENERATED
pub fn build_backend() {
    println!("build: starting the application via docker...");

    Command::new("docker-compose")
    .args(["build"])
    .status()
    .expect("Failed to execute command");
}

pub fn start_backend() {
    println!("up: starting the application via docker...");

    Command::new("docker-compose")
        .args(["up", "-d"])
        .status()
        .expect("Failed to execute command");
}

pub fn run_backend(options_run: &String) {
    println!("run: running command to docker container...");

    Command::new("docker-compose")
        .args(["up", "-d", &options_run])
        .status()
        .expect("Failed to execute command");
}