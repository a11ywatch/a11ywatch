use crate::runtime::docker;
use crate::generators::compose;

#[derive(Debug, Default)]
pub(crate) struct Build {}

impl Build {
    pub(crate) fn process(local: &bool) -> &bool {
        if *local {
            println!("TODO: build all services on local machine...");
        } else {
            compose::generate_compose();
            docker::build_backend();
        }
    
        &local
    }
}