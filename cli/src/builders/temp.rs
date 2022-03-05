use crate::generators::compose;
use std::fs::File;
use std::io::prelude::*;
use std::path::Path;

// return true if created a new compose file
pub fn create_compose_file() -> std::io::Result<()> {

    if !Path::new("a11ywatch.yml").exists() {
        println!("creating a11ywatch.yml compose file");
        let mut file = File::create("a11ywatch.yml")?;
        file.write_all(&compose::generate_compose().as_bytes())?;
    }

    Ok(())
}