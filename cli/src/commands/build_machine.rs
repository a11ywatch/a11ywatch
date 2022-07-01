use crate::launchers::docker;
use crate::fs::temp::{TempFs};
use std::process::Command;

#[derive(Debug, Default)]
pub(crate) struct Build {}

impl Build {
    /// run docker build command with system or npm install for the sidecar.
    pub(crate) fn process(local: &bool) -> &bool {
        let mut file_manager = TempFs::new();

        if *local {
            Command::new("npm")
                .args(["i", "@a11ywatch/a11ywatch", "-g"])
                .status()
                .expect("Failed to execute command - compose down command");
        } else {
            file_manager.create_env_file().unwrap();
            file_manager.create_compose_backend_file().unwrap();
            file_manager.create_compose_frontend_file().unwrap();
            docker::build_backend(&file_manager);
        }
    
        &local
    }

    /// run docker build backend to upgrade images or re-install the sidecar@latest.
    pub(crate) fn upgrade(local: &bool) -> &bool {
        let mut file_manager = TempFs::new();

        if *local {
            Command::new("npm")
                .args(["i", "@a11ywatch/a11ywatch", "-g"])
                .status()
                .expect("Failed to execute command - compose down command");
        } else {
            file_manager.create_compose_backend_file().unwrap();
            file_manager.create_compose_frontend_file().unwrap();
            docker::upgrade(&file_manager);
        }
    
        &local
    }
}