use crate::generators::compose;
use std::fs::{File, create_dir};
use std::io::prelude::*;
use std::path::Path;

// return true if created a new compose file
pub fn create_compose_file() -> std::io::Result<()> {
    if !Path::new("/tmp").exists() {
        create_dir("/tmp")?;
    }
    if !Path::new("/tmp/a11ywatch").exists() {
        create_dir("/tmp/a11ywatch")?;
    }
    if !Path::new("/tmp/a11ywatch/compose.yml").exists() {
        let mut file = File::create("/tmp/a11ywatch/compose.yml")?;
        file.write_all(&compose::generate_compose().as_bytes())?;
    }
    Ok(())
}