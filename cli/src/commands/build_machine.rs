use crate::runtime::docker;

#[derive(Debug, Default)]
pub(crate) struct Build {}

impl Build {
    pub(crate) fn process(local: &bool) -> &bool {
        if *local {
            println!("TODO: build all services on local machine...");
        } else {
            docker::build_backend();
        }
    
        &local
    }
}