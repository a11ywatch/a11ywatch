use crate::generators::compose::{generate_compose_backend, generate_compose_frontend};
use std::fs::{File, create_dir};
use std::io::prelude::*;
use std::path::Path;

// os_imp::temp_dir()

fn ensure_temp_dir() -> std::io::Result<()> {
    if !Path::new("/tmp").exists() {
        create_dir("/tmp")?;
    }
    if !Path::new("/tmp/a11ywatch").exists() {
        create_dir("/tmp/a11ywatch")?;
    }
    Ok(())
}

// return true if created a new compose file
pub fn create_compose_backend_file() -> std::io::Result<()> {
    ensure_temp_dir()?;
    if !Path::new("/tmp/a11ywatch/compose.yml").exists() {
        let mut file = File::create("/tmp/a11ywatch/compose.yml")?;
        file.write_all(&generate_compose_backend().as_bytes())?;
    }
    Ok(())
}

pub fn create_compose_frontend_file() -> std::io::Result<()> {
    ensure_temp_dir()?;
    if !Path::new("/tmp/a11ywatch/compose.frontend.yml").exists() {
        let mut file = File::create("/tmp/a11ywatch/compose.frontend.yml")?;
        file.write_all(&generate_compose_frontend().as_bytes())?;
    }
    Ok(())
}