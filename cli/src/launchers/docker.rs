use crate::fs::TempFs;
use std::process::Command;
use crate::INCLUDE_FRONTEND;
use std::env;

/// Run docker compose build command with frontend and backend configuration.
pub(crate) fn build_backend(file_manager: &TempFs) {
    let frontend: bool = match env::var(INCLUDE_FRONTEND) {
        Ok(val) => val == "true",
        Err(_) => false,
    };

    let mut docker_args = vec![ "-f", &file_manager.backend_compose];

    if frontend {
        docker_args.push("-f");
        docker_args.push(&file_manager.frontend_compose);
    }

    docker_args.push("build");

    Command::new("docker-compose")
        .args(docker_args)
        .status()
        .expect("Failed to execute command");
}

/// Run docker image upgrades across services.
pub(crate) fn upgrade(file_manager: &TempFs) {
    let frontend: bool = match env::var(INCLUDE_FRONTEND) {
        Ok(val) => val == "true",
        Err(_) => false,
    };

    let mut docker_args = vec![ "-f", &file_manager.backend_compose];

    if frontend {
        docker_args.push("-f");
        docker_args.push(&file_manager.frontend_compose);
    }

    let mut down_args = docker_args.clone();
    down_args.push("down");

    let mut pull_args = docker_args.clone();
    pull_args.push("pull");

    Command::new("docker-compose")
        .args(down_args)
        .status()
        .expect("Failed to execute command - compose down command");

    Command::new("docker-compose")
        .args(pull_args)
        .status()
        .expect("Failed to execute command - compose build --pull");
}

/// Run docker compose start command for system.
pub(crate) fn start_service(frontend: &bool, file_manager: &TempFs) {
    let mut cmd = Command::new("docker-compose");

    if *frontend {
        cmd.args([
            "-f",
            &file_manager.backend_compose,
            "-f",
            &file_manager.frontend_compose,
            "up",
            "-d",
        ])
        .status()
        .expect("Failed to execute command");
    } else {
        cmd.args(["-f", &file_manager.backend_compose, "up", "-d"])
            .status()
            .expect("Failed to execute command");
    }
}

/// shut down the local instance and remove containers
pub(crate) fn stop_service(frontend: &bool, file_manager: &TempFs) {
    let mut cmd = Command::new("docker-compose");

    if *frontend {
        cmd.args([
            "-f",
            &file_manager.backend_compose,
            "-f",
            &file_manager.frontend_compose,
            "down",
        ])
        .status()
        .expect("Failed to execute command");
    } else {
        cmd.args(["-f", &file_manager.backend_compose, "down"])
            .status()
            .expect("Failed to execute command");
    }
}
