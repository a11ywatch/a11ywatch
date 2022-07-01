use crate::launchers::terraform;

#[derive(Debug, Default)]
pub(crate) struct Deploy {}

/// remote deploy the application via terraform.
impl Deploy {
    /// deploy the application.
    pub(crate) fn process(all: &bool) -> &bool {
        terraform::deploy_all();

        &all
    }
    /// terminate the application shutting down all processes.
    pub(crate) fn process_terminate(all: &bool) -> &bool {
        terraform::destroy_all();

        &all
    }
}