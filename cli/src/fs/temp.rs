use crate::generators::compose::{generate_compose_backend, generate_compose_frontend, generate_compose_runner};
use std::fs::{File, create_dir, remove_dir_all};
use std::io::prelude::*;
use std::path::Path;
use serde_json::{json, Value, from_reader};

/// Manage file paths and contents for system
pub(crate) struct TempFs {
    /// temp app directory for a11ywatch
    app_dir: String,
    /// backend infra compose file
    pub backend_compose: String,
    /// frontend compose file
    pub frontend_compose: String,
    /// runner compose file
    pub runner_compose: String,
    /// results of scan file location
    pub results_file: String,
    /// results of github html file location
    pub results_github_file: String,
    /// infra config file
    pub config_file: String
}

fn merge(a: &mut Value, b: &Value) {
    match (a, b) {
        (Value::Object(ref mut a), &Value::Object(ref b)) => {
            for (k, v) in b {
                merge(a.entry(k.clone()).or_insert(Value::Null), v);
            }
        }
        (a, b) => {
            *a = b.clone();
        }
    }
}


/// standard file system handling methods
pub(crate)
trait Fs {
    fn new () -> Self;
    fn set_token(&self) {}
    fn ensure_temp_dir(&self);
    fn create_compose_backend_file(&self);
    fn create_compose_frontend_file(&self);
    fn create_compose_runner_file(&self);
    fn sync();
}

/// temporary file system
impl TempFs {
    pub fn new() -> Self {
        let tmp_dir = std::env::temp_dir().display().to_string();
        let app_dir = format!("{}/a11ywatch", &tmp_dir);
        let config_file = format!("{}/config.json", &app_dir);
        let results_file = format!("{}/results.json", &app_dir);
        let results_github_file = format!("{}/results_github.json", &app_dir);

        TempFs::ensure_temp_dir(&tmp_dir, &app_dir).unwrap();
        TempFs::sync(&app_dir, &config_file).unwrap();
        
        Self {
            backend_compose: format!("{}/compose.yml", app_dir),
            frontend_compose: format!("{}/compose.frontend.yml", app_dir),
            runner_compose: format!("{}/compose.runner.yml", app_dir),
            results_file,
            config_file,
            app_dir,
            results_github_file
        }
    }

    /// get the apps temp directory location
    pub fn get_temp_dir(&mut self) -> &String {
       &self.app_dir
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

    /// create compose runner file is does not exist
    pub fn create_compose_runner_file(&mut self, url: &str) -> std::io::Result<()> {
        if !Path::new(&self.runner_compose).exists() {
            let mut file = File::create(&self.runner_compose)?;
            file.write_all(&generate_compose_runner(&url).as_bytes())?;
        }
        Ok(())
    }

    /// read results from scan to string
    pub fn read_results(&self) -> String {
        let mut file = File::open(&self.results_file).unwrap();
        let mut data = String::new();
        file.read_to_string(&mut data).unwrap();
            
        data
    }

    /// read results from scan to string
    pub fn read_results_github(&self) -> String {
        let mut file = File::open(&self.results_github_file).unwrap();
        let mut data = String::new();
        file.read_to_string(&mut data).unwrap();
            
        data
    }

    /// set the api token to use for request
    pub fn get_token(&self) -> String {
        let file = File::open(&self.config_file).unwrap();
        let json: Value = from_reader(&file).unwrap();
        let token = &json["token"];

        token.as_str().unwrap_or_default().into()
    }

    /// set the api token to use for request
    pub fn set_token(&self, token: &String) -> std::io::Result<()> {
        let file = File::open(&self.config_file)?;
        let mut prev_json: Value = from_reader(&file)?;
                
        let json = json!({
            "token": &token
        });    
        
        merge(&mut prev_json, &json);
        
        let mut file = File::create(&self.config_file)?;

        file.write_all(&prev_json.to_string().as_bytes())?;

        Ok(())
    }

    /// create compose frontend file is does not exist
    pub fn save_results(&self, json: &serde_json::Value) -> std::io::Result<()> {
        let mut file = File::create(&self.results_file)?;
        file.write_all(&json.to_string().as_bytes())?;

        Ok(())
    }

    /// create compose frontend file is does not exist
    pub fn save_github_results(&self, json: &serde_json::Value) -> std::io::Result<()> {
        let mut file = File::create(&self.results_github_file)?;
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
            let file = File::open(&config_file)?;
            let mut prev_json: Value = from_reader(&file).expect("file should be proper JSON");
            let current_version = prev_json.get("version").expect("file should have version key");
            
            if version != current_version {
                // reset app directory contents
                remove_dir_all(&app_dir).unwrap();
                create_dir(&app_dir).unwrap();
    
                let json = json!({
                    "version": version
                });    
    
                merge(&mut prev_json, &json);

                let mut file = File::create(&config_file)?;

                file.write_all(&prev_json.to_string().as_bytes())?;
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
        let app_dir = format!("{}/a11ywatch", &tmp_dir);
        let results_file = format!("{}/results.json", &app_dir);
        let results_github_file = format!("{}/results_github.json", &app_dir);

        // let config_file = &format!("{}/config.json", app_dir);

        Self {
            backend_compose: format!("{}/compose.yml", app_dir),
            frontend_compose: format!("{}/compose.frontend.yml", app_dir),
            runner_compose: format!("{}/compose.runner.yml", app_dir),
            config_file :format!("{}/compose.json", app_dir),
            // app_dir: format!("{}", app_dir),
            results_file,
            app_dir,
            results_github_file
        }
    }
    fn ensure_temp_dir(&self) {}
    fn set_token(&self) {}
    fn create_compose_backend_file(&self) {}
    fn create_compose_frontend_file(&self) {}
    fn create_compose_runner_file(&self) {}
    fn sync() {}
  }