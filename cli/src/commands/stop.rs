use crate::launchers::docker;
use crate::fs::{TempFs};
use std::env;
use crate::INCLUDE_FRONTEND;

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
            println!("Error: API not implemented. CLI interface holding entry as stub.");
        } else {
            docker::stop_service(&frontend, &file_manager);
        }

        *local
    }
}