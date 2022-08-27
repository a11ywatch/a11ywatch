use serde::Deserialize;
use std::fs;
use std::fs::{create_dir, File};
use std::path::Path;
use std::path::PathBuf;
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
    let srcdir = PathBuf::from("./src");
    // schema abs path to string
    let schema_dir = format!(
        "{}/schema/",
        fs::canonicalize(&srcdir).unwrap().to_string_lossy()
    );
    let dist_dir = "../../a11ywatch_clients/";

    // make sure a11ywatch_clients folder exist
    if !Path::new(&dist_dir).exists() {
        create_dir(&dist_dir).unwrap();
    }

    let dist_dir = PathBuf::from(dist_dir);
    let dist_dir = fs::canonicalize(&dist_dir).unwrap();
    // dist abs path to string
    let dist_dir = &dist_dir.to_string_lossy();

    let file = File::open(format!("{}/rest.json", schema_dir)).unwrap();
    let rest: Rest = serde_json::from_reader(file).expect("JSON not formatted correctly");

    let api_file_loc = format!("{}api.json", schema_dir);

    println!("OpenAPI spec file location {}", &api_file_loc);

    for lang in rest.languages.iter() {
        let language_dir = format!("{}/{}_api_client", &dist_dir, &lang.name);

        Command::new("openapi-generator-cli")
            .args([
                "generate",
                "-i",
                &api_file_loc,
                "-g",
                &lang.name,
                "-o",
                &language_dir,
            ])
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
