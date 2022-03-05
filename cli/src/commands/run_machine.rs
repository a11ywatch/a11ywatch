use crate::runtime::docker;
use crate::builders::temp;

#[derive(Debug, Default)]
pub struct Start {}

impl Start {
    pub fn process(local: &bool) -> &bool {
        if *local {
            println!("TODO: build all services on local machine...");
        } else {
            temp::create_compose_file().unwrap();
            docker::start_backend();
        }

        &local
    }
}