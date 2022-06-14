use std::fs::{File, create_dir};
use std::path::Path;
use serde::Deserialize;
use std::process::Command;
use std::thread;

/// individual coding language from the rest schema
#[derive(Debug, Deserialize)]
struct Language {
    /// the language js, php, go, and etc
    name: String,
}

/// rest schema 
#[derive(Debug, Deserialize)]
struct Rest {
    /// the languages to target client generating
    pub languages: Vec<Language>,
}

/// build the javascript src files and distrubition
pub fn generate_clients() {
    println!("building js client...");
    let dist_dir = "../../a11ywatch_clients/";
    let schema_dir = "./src/schema/";

    // make sure a11ywatch_clients folder exist
    if !Path::new(&dist_dir).exists() {
        create_dir(dist_dir).unwrap();
    }

    let file = File::open(format!("{}/rest.json", schema_dir)).unwrap();
    let rest: Rest = serde_json::from_reader(file).expect("JSON not formatted correctly");

    for lang in rest.languages.iter() {
        let language_dir = format!("{}/{}_api_client", dist_dir, &lang.name);

        Command::new("openapi-generator")
            .args(["generate", "-i", "src/schema/api.json", "-g", &lang.name, "-o", &language_dir])
            .status()
            .expect("Failed to execute command - openapi-generator");

        // publish latest javascript build
        if lang.name == "javascript" {
            thread::spawn(move || {
                Command::new("npm")
                    .args(["install", "--prefix", &language_dir])
                    .status()
                    .expect("Failed to install to npm");
                
                Command::new("npm")
                    .args(["publish", &language_dir])
                    .status()
                    .expect("Failed to publish to npm");
            });
        }
    }

    // TODO: perform git repo push to client source
}