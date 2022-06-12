use std::fs::{File, create_dir};
use std::io::{Write, Read};
use std::path::Path;
use serde::Deserialize;
use std::collections::HashMap;
use super::generate_request;
use super::{generate_controller, generate_controller_imports};

/// individual route from the rest schema
#[derive(Debug, Deserialize)]
struct Route {
    // method for path.
    method: String,
    /// route path
    path: String,
    /// headers for route
    headers: Option<HashMap<String, String>>,
}

/// rest schema 
#[derive(Debug, Deserialize)]
struct Rest {
    /// the api version
    pub version: String,
    /// the api base endpoint ending in slash
    pub endpoint: String,
    /// the api routes for the system
    pub routes: Vec<Route>,
}

/// build the javascript src files and distrubition
pub fn build_javascript() {
    println!("building js client...");
    let dist_dir = "./src/api_client_generator/javascript/dist";
    let schema_dir = "./src/schema/";

    if !Path::new(&dist_dir).exists() {
        create_dir(dist_dir).unwrap();
    }

    let mut file = File::create(format!("{}/request.ts", dist_dir)).unwrap();
    file.write_all(&generate_request().as_bytes()).unwrap();

    let mut file = File::open(format!("{}/rest.json", schema_dir)).unwrap();
    // get the rest schema
    let rest: Rest = serde_json::from_reader(file).expect("JSON not formatted correctly");

    let mut file = File::create(format!("{}/controller.ts", dist_dir)).unwrap();

    file.write_all(&generate_controller_imports().as_bytes()).unwrap();

    for route in rest.routes.iter() {
        file.write_all(&generate_controller(&route.path, &route.method, route.headers.as_ref()).as_bytes()).unwrap();
    }
}