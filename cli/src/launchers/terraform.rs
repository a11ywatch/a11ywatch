use std::process::Command;

pub fn deploy_all() {
    println!("build: starting the application via terraform...");

    Command::new("./scripts/deploy.sh")
        .status()
        .expect("Failed to execute command");
}

pub fn destroy_all() {
    println!("build: destroying the application via terraform...");

    Command::new("./scripts/destroy.sh")
        .status()
        .expect("Failed to execute command");
}
