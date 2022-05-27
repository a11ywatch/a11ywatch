use std::process::Command;
use crate::fs::TempFs;

/// Run docker compose build command with frontend and backend configuration.
pub(crate) fn build_backend(file_manager: &TempFs) {
    Command::new("docker-compose")
    .args(["-f", &file_manager.backend_compose, "-f", &file_manager.frontend_compose, "build"])
    .status()
    .expect("Failed to execute command");
}

/// Run docker image upgrades across services.
pub(crate) fn upgrade(file_manager: &TempFs) {
    Command::new("docker-compose")
        .args(["-f", &file_manager.backend_compose, "-f", &file_manager.frontend_compose, "down"])
        .status()
        .expect("Failed to execute command - compose down command");

    Command::new("docker-compose")
        .args(["-f", &file_manager.backend_compose, "-f", &file_manager.frontend_compose, "pull"])
        .status()
        .expect("Failed to execute command - compose build --pull");
}

/// Run docker compose start command for system.
pub(crate) fn start_service(frontend: &bool, file_manager: &TempFs) {
    let mut cmd = Command::new("docker-compose");

    if *frontend {
        cmd
        .args(["-f", &file_manager.backend_compose, "-f", &file_manager.frontend_compose, "up", "-d"])
        .status()
        .expect("Failed to execute command");
    } else {
        cmd
        .args(["-f", &file_manager.backend_compose, "up", "-d"])
        .status()
        .expect("Failed to execute command");
    }
}

/// shut down the local instance and remove containers
pub(crate) fn stop_service(frontend: &bool, file_manager: &TempFs) {
    let mut cmd = Command::new("docker-compose");

    if *frontend {
        cmd
        .args(["-f", &file_manager.backend_compose, "-f", &file_manager.frontend_compose, "down"])
        .status()
        .expect("Failed to execute command");
    } else {
        cmd
        .args(["-f", &file_manager.backend_compose, "down"])
        .status()
        .expect("Failed to execute command");
    }
}