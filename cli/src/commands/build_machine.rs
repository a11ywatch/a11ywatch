use crate::launchers::docker;
use crate::fs::temp::{TempFs};

#[derive(Debug, Default)]
pub(crate) struct Build {}

impl Build {
    /// run docker build command with system.
    pub(crate) fn process(local: &bool) -> &bool {
        let mut file_manager = TempFs::new();

        if *local {
            println!("Error: API not implemented. CLI interface holding entry as stub.");
        } else {
            file_manager.create_compose_backend_file().unwrap();
            file_manager.create_compose_frontend_file().unwrap();
            docker::build_backend(&file_manager);
        }
    
        &local
    }

    /// run docker build backend to upgrade images.
    pub(crate) fn upgrade(local: &bool) -> &bool {
        let mut file_manager = TempFs::new();

        if *local {
            println!("Error: API not implemented. CLI interface holding entry as stub.");
        } else {
            file_manager.create_compose_backend_file().unwrap();
            file_manager.create_compose_frontend_file().unwrap();
            docker::upgrade(&file_manager);
        }
    
        &local
    }
}