use crate::runtime::docker;

pub fn process(local: &bool) -> &bool {
    if *local {
        println!("TODO: build all services on local machine...");
    } else {
        docker::build_backend();
    }

    &local
}