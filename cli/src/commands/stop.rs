use crate::fs::TempFs;
use crate::launchers::docker;
use crate::INCLUDE_FRONTEND;
use std::env;
use std::process::Command;

#[derive(Debug, Default)]
pub struct Stop {}

impl Stop {
    pub(crate) fn process(local: &bool) -> bool {
        let file_manager = TempFs::new();
        let frontend: bool = match env::var(INCLUDE_FRONTEND) {
            Ok(val) => val == "true",
            Err(_) => false,
        };
        if *local {
            Command::new("killall")
                .args(["-9", "node"])
                .status()
                .expect("Failed to execute killall command.");
        } else {
            docker::stop_service(&frontend, &file_manager);
        }

        *local
    }
}
