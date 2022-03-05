use crate::runtime::docker;

#[derive(Debug, Default)]
pub struct Start {}

impl Start {
    pub fn process(local: &bool) -> &bool {
        if *local {
            println!("TODO: build all services on local machine...");
        } else {
            docker::start_backend();
        }

        &local
    }
}