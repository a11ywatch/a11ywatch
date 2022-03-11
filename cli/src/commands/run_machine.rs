use crate::launchers::docker;
use crate::fs::{TempFs};
use std::env;
use crate::INCLUDE_FRONTEND;

#[derive(Debug, Default)]
pub struct Start {}

impl Start {
    pub fn process(local: &bool) -> &bool {
        let mut file_manager = TempFs::new();

        let frontend: bool = match env::var(INCLUDE_FRONTEND) {
            Ok(val) => val == "true",
            Err(_) => false,
        };

        if *local {
            println!("TODO: start all services on local machine...");
        } else {
            if frontend {
                file_manager.create_compose_frontend_file().unwrap();
            }
            // TODO: OPTIONAL BE CLIENT
            file_manager.create_compose_backend_file().unwrap();
            docker::start_service(&frontend, &file_manager);
        }

        &local
    }
}

#[derive(Debug, Default)]
pub struct Stop {}

impl Stop {
    pub(crate) fn process(local: &bool) -> &bool {
        let file_manager = TempFs::new();
        let frontend: bool = match env::var(INCLUDE_FRONTEND) {
            Ok(val) => val == "true",
            Err(_) => false,
        };
        if *local {
            println!("TODO: stop all services on local machine...");
        } else {
            docker::stop_service(&frontend, &file_manager);
        }

        &local
    }
}