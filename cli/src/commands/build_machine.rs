use crate::runtime::docker;
use crate::builders::temp;

#[derive(Debug, Default)]
pub(crate) struct Build {}

impl Build {
    pub(crate) fn process(local: &bool) -> &bool {
        if *local {
            println!("TODO: build all services on local machine...");
        } else {
            temp::create_compose_file().unwrap();
            docker::build_backend();
        }
    
        &local
    }
}