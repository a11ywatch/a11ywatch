use crate::launchers::docker;
use crate::builders::temp::{init, create_compose_frontend_file, create_compose_backend_file};

#[derive(Debug, Default)]
pub(crate) struct Build {}

impl Build {
    pub(crate) fn process(local: &bool) -> &bool {
        init().unwrap();

        if *local {
            println!("TODO: build all services on local machine...");
        } else {
            create_compose_backend_file().unwrap();
            create_compose_frontend_file().unwrap();
            docker::build_backend();
        }
    
        &local
    }
}