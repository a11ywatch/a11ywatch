use crate::generators::compose::{generate_compose_backend, generate_compose_frontend};
use std::fs::{File, create_dir, remove_dir_all};
use std::io::prelude::*;
use std::path::Path;
use serde_json::{json, Value, from_reader};

const CONFIG_FILE: &str = "/tmp/a11ywatch/config.json";
const APP_DIRECTORY: &str = "/tmp/a11ywatch";

fn ensure_temp_dir() -> std::io::Result<()> {
    if !Path::new("/tmp").exists() {
        create_dir("/tmp")?;
    }
    if !Path::new(APP_DIRECTORY).exists() {
        create_dir(APP_DIRECTORY)?;
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

/// determine whether the temp dir needs to re-init from a new version change
pub fn sync() -> std::io::Result<()> {
    let version: &'static str = env!("CARGO_PKG_VERSION");

    if Path::new(CONFIG_FILE).exists() {
        let file = File::open(CONFIG_FILE).expect("file should open");
        let json: Value = from_reader(file).expect("file should be proper JSON");
        let current_version = json.get("version").expect("file should have version key");
        
        if version != current_version {
            // reset app directory contents
            remove_dir_all(APP_DIRECTORY).unwrap();
            create_dir(APP_DIRECTORY).unwrap();

            let mut file = File::create(CONFIG_FILE)?;
            let json = json!({
                "version": version
            });    

            file.write_all(&json.to_string().as_bytes())?;
        }
    } else {
        let mut file = File::create(CONFIG_FILE)?;
        let json = json!({
            "version": version
        });

        file.write_all(&json.to_string().as_bytes())?;
    }

    Ok(())
}