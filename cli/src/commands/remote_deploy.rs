use crate::runtime::terraform;

#[derive(Debug, Default)]
pub(crate) struct Deploy {}

impl Deploy {
    pub(crate) fn process(all: &bool) -> &bool {
        terraform::deploy_all();

        &all
    }
    pub(crate) fn process_terminate(all: &bool) -> &bool {
        terraform::destroy_all();

        &all
    }
}