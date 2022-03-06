use std::process::Command;

// TODO: TARGET COMPOSE LOCATION OF FILE
pub fn build_backend() {
    Command::new("docker-compose")
        .args(["build"])
        .status()
        .expect("Failed to execute command");
}

pub fn start_backend(frontend: &bool) {
    let mut cmd = Command::new("docker-compose");

    // TODO: RUN ONLY CLIENT OR BACKEND (ATM ONLY CLIENT IS SPLIT)
    if *frontend {
        cmd
        .args(["-f", "/tmp/a11ywatch/compose.yml", "-f", "/tmp/a11ywatch/compose.frontend.yml", "up", "-d"])
        .status()
        .expect("Failed to execute command");
    } else {
        cmd
        .args(["-f", "/tmp/a11ywatch/compose.yml", "up", "-d"])
        .status()
        .expect("Failed to execute command");
    }
}

pub fn run_backend(options_run: &str) {
    Command::new("docker-compose")
        .args(["up", "-d", &options_run])
        .status()
        .expect("Failed to execute command");
}