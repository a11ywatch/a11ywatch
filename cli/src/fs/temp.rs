use crate::generators::compose::{generate_compose_backend, generate_compose_frontend};
use std::fs::{File, create_dir, remove_dir_all};
use std::io::prelude::*;
use std::path::Path;
use serde_json::{json, Value, from_reader};

/// Manage file paths and contents for system
#[derive(Debug, Clone)]
pub(crate) struct TempFs {
    // backend infra compose file
    pub backend_compose: String,
    // // frontend infra compose file
    pub frontend_compose: String,
    // // app directory root
    // pub app_dir: String,
    // results of scan file location
    pub results_file: String,
    // // infra config file
    // pub config_file: String
}

pub(crate)
trait Fs {
    fn new () -> Self;
    fn ensure_temp_dir(&self);
    fn create_compose_backend_file(&self);
    fn create_compose_frontend_file(&self);
    fn sync();
}

impl TempFs {
    pub fn new() -> Self {
        let tmp_dir = std::env::temp_dir().display().to_string();
        let app_dir = &format!("{}/a11ywatch", &tmp_dir);
        let config_file = &format!("{}/config.json", &app_dir);
        let results_file = format!("{}/results.json", &app_dir);

        TempFs::ensure_temp_dir(&tmp_dir, &app_dir).unwrap();
        TempFs::sync(&app_dir, &config_file).unwrap();
        
        Self {
            backend_compose: format!("{}/compose.yml", app_dir),
            frontend_compose: format!("{}/compose.frontend.yml", app_dir),
            results_file: format!("{}", results_file),
            // config_file: format!("{}", config_file),
        }
    }
    
    /// create compose backend file is does not exist
    pub fn create_compose_backend_file(&mut self) -> std::io::Result<()> {
        if !Path::new(&self.backend_compose).exists() {
            let mut file = File::create(&self.backend_compose)?;
            file.write_all(&generate_compose_backend().as_bytes())?;
        }
        Ok(())
    }
    
    /// create compose frontend file is does not exist
    pub fn create_compose_frontend_file(&mut self) -> std::io::Result<()> {
        if !Path::new(&self.frontend_compose).exists() {
            let mut file = File::create(&self.frontend_compose)?;
            file.write_all(&generate_compose_frontend().as_bytes())?;
        }
        Ok(())
    }
    
    /// read results from scan to string
    pub fn read_results(self) -> String {
        let mut file = File::open(self.results_file).unwrap();
        let mut data = String::new();
        file.read_to_string(&mut data).unwrap();
            
        data
    }

    /// create compose frontend file is does not exist
    pub fn save_results(&mut self, json: &serde_json::Value) -> std::io::Result<()> {
        let mut file = File::create(&self.results_file)?;
        file.write_all(&json.to_string().as_bytes())?;

        Ok(())
    }

    /// make sure the tmp directory is created for the app
    fn ensure_temp_dir(tmp_dir: &str, app_dir: &str) -> std::io::Result<()> {    
        if !Path::new(tmp_dir).exists() {
            create_dir(tmp_dir)?;
        }
        if !Path::new(&app_dir).exists() {
            create_dir(app_dir)?;
        }
        Ok(())
    }

    /// determine whether the temp dir needs to re-init from a new version change
    fn sync(app_dir: &str, config_file: &str) -> std::io::Result<()> {
        let version: &'static str = env!("CARGO_PKG_VERSION");

        if Path::new(&config_file).exists() {
            let file = File::open(&config_file).expect("file should open");
            let json: Value = from_reader(file).expect("file should be proper JSON");
            let current_version = json.get("version").expect("file should have version key");
            
            if version != current_version {
                // reset app directory contents
                remove_dir_all(&app_dir).unwrap();
                create_dir(&app_dir).unwrap();
    
                let mut file = File::create(&config_file)?;
                let json = json!({
                    "version": version
                });    
    
                file.write_all(&json.to_string().as_bytes())?;
            }
        } else {
            let mut file = File::create(&config_file)?;
            let json = json!({
                "version": version
            });
    
            file.write_all(&json.to_string().as_bytes())?;
        }
    
        Ok(())
    }
}

impl Fs for TempFs {
    fn new() -> Self {
        let tmp_dir = std::env::temp_dir().display().to_string();
        let app_dir = &format!("{}/a11ywatch", &tmp_dir);
        let results_file = format!("{}/results.json", &app_dir);
        // let config_file = &format!("{}/config.json", app_dir);

        Self {
            backend_compose: format!("{}/compose.yml", app_dir),
            frontend_compose: format!("{}/compose.frontend.yml", app_dir),
            // app_dir: format!("{}", app_dir),
            results_file: format!("{}", results_file),
            // config_file: "/tmp/a11ywatch/config.json".to_string(),
        }
    }
    fn ensure_temp_dir(&self) {}
    fn create_compose_backend_file(&self) {}
    fn create_compose_frontend_file(&self) {}
    fn sync() {}
  }