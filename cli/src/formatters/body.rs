
use serde_json::{from_str, json, from_value, Value};
use crate::fs::temp::{TempFs};
use crate::utils::{Website};

pub(crate) fn results_to_string(file_manager: TempFs) -> String {
    let file_results: String = file_manager.read_results();
    let v: Value = from_str(&file_results).unwrap();

    v.to_string()
}

pub(crate) fn format_body(file_manager: TempFs) -> Value {
    let file_results: String = file_manager.read_results();
    let v: Value = from_str(&file_results).unwrap();
    let w = &v["website"];
    let website: Website = from_value(w.to_owned()).unwrap();
    let website_url = &website.url;
    let issues_length = website.issue.len();

    let seperator = if issues_length == 1 {
        ""
    } else {
        "s"
    }.to_string();

    let payload = format!("{} issue{} found for {}", &issues_length, seperator, &website_url).to_string();

    json!({
        "body": payload,
    })
}