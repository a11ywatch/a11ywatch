use std::fs::{File, create_dir};
use std::io::Write;
use std::path::Path;


/// generate network request wrapper
pub fn generate_fetch() -> &'static str {
    &r#"
package main

import (
    "bytes"
    "encoding/json"
    "net/http"
    "log"
)

/**
 * request takes a list of map strings and performs network request to the api returning json
 */
func request(values map[string]interface{}) (interface{}) {
    json_data, err := json.Marshal(values)

    if err != nil {
        log.Fatal(err)
    }

    resp, err := http.Post("https://api.a11ywatch.com", "application/json",
        bytes.NewBuffer(json_data))

    if err != nil {
        log.Fatal(err)
    }

    var res map[string]interface{}

    json.NewDecoder(resp.Body).Decode(&res)

    return res[`json`]
}
"#.trim_start()
}

pub fn build_go(){
    println!("building go client...");
    let dist_dir = "./src/api_client_generator/go/dist";

    if !Path::new(&dist_dir).exists() {
        create_dir(dist_dir).unwrap();
    }

    let mut file = File::create(format!("{}/request.go", dist_dir)).unwrap();
    file.write_all(&generate_fetch().as_bytes()).unwrap();
}