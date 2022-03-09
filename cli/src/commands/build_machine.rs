use crate::launchers::docker;
use crate::builders::temp::{create_compose_frontend_file};

#[derive(Debug, Default)]
pub(crate) struct Build {}

impl Build {
    pub(crate) fn process(local: &bool) -> &bool {
        if *local {
            println!("TODO: build all services on local machine...");
        } else {
            create_compose_frontend_file().unwrap();
            docker::build_backend();
        }
    
        &local
    }
}