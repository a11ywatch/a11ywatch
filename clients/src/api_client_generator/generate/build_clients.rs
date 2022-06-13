use std::fs::{File, create_dir};
use std::io::{Write, Read};
use std::path::Path;
use serde::Deserialize;
use std::collections::HashMap;
use std::process::Command;

/// individual coding language from the rest schema
#[derive(Debug, Deserialize)]
struct Language {
    /// the language js, php, go, and etc
    name: String,
}

/// rest schema 
#[derive(Debug, Deserialize)]
struct Rest {
    /// the API version
    pub version: String,
    /// the languages to target client generating
    pub languages: Vec<Language>,
}

/// build the javascript src files and distrubition
pub fn generate_clients() {
    println!("building js client...");
    let dist_dir = "./libs/";
    let schema_dir = "./src/schema/";

    if !Path::new(&dist_dir).exists() {
        create_dir(dist_dir).unwrap();
    }

    let mut file = File::open(format!("{}/rest.json", schema_dir)).unwrap();
    let rest: Rest = serde_json::from_reader(file).expect("JSON not formatted correctly");

    for lang in rest.languages.iter() {
        let language_dir = format!("{}/{}_api_client", dist_dir, &lang.name);

        Command::new("openapi-generator")
            .args(["generate", "-i", "src/schema/api.json", "-g", &lang.name, "-o", &language_dir])
            .status()
            .expect("Failed to execute command - openapi-generator");
    }
}