use crate::runtime::docker;
use crate::builders::temp;
use std::env;
use crate::INCLUDE_FRONTEND;

#[derive(Debug, Default)]
pub struct Start {}

impl Start {
    pub fn process(local: &bool) -> &bool {
        let frontend: bool = match env::var(INCLUDE_FRONTEND) {
            Ok(val) => val == "true",
            Err(_) => false,
        };

        if *local {
            println!("TODO: build all services on local machine...");
        } else {
            if frontend {
                temp::create_compose_frontend_file().unwrap();
            }
            // TODO: OPTIONAL OR CLIENT BE
            temp::create_compose_backend_file().unwrap();
            docker::start_backend(&frontend);
        }

        &local
    }
}