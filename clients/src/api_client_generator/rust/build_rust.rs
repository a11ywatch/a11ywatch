use std::fs::{File, create_dir};
use std::io::Write;
use std::path::Path;


/// generate network request wrapper
pub fn generate_fetch() -> &'static str {
    &r#"
use reqwest;

/// perform a network request POST to the API
pub fn request_post(path: str, map: HashMap<String>, token: str) {
    let client = reqwest::Client::new();
    let res = client.post(format!("https://api.a11ywatch.com/{}", path))
        .header(AUTHORIZATION, token)
        .json(&map)
        .send()
        .await?
}

/// perform a network request GET to the API
pub fn request_post(path: str, map: HashMap<String>, token: str) {
    let client = reqwest::Client::new();
    let res = client.get(format!("https://api.a11ywatch.com/{}", path))
        .header(AUTHORIZATION, token)
        .send()
        .await?
}

"#.trim_start()
}

pub fn build_rust(){
    println!("building rust client...");
    let dist_dir = "./src/api_client_generator/rust/dist";

    if !Path::new(&dist_dir).exists() {
        create_dir(dist_dir).unwrap();
    }

    let mut file = File::create(format!("{}/request.rs", dist_dir)).unwrap();
    file.write_all(&generate_fetch().as_bytes()).unwrap();
}