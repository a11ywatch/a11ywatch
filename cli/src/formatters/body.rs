
use serde_json::{from_str, json, from_value, Value};
use crate::fs::temp::{TempFs};
use crate::utils::{Website};
use std::io::{Write};
use std::str;

pub(crate) fn results_to_string(file_manager: &TempFs) -> String {
    let file_results: String = file_manager.read_results();
    let v: Value = from_str(&file_results).unwrap();

    v.to_string()
}

pub(crate) fn format_body(file_manager: &TempFs) -> Value {
    let file_results: String = file_manager.read_results();
    let v: Value = from_str(&file_results).unwrap();
    let w = &v["data"];
    let website: Website = from_value(w.to_owned()).unwrap();
    let website_url = &website.url;
    let issues_length = website.issues.len();

    let seperator = if issues_length == 1 {
        ""
    } else {
        "s"
    }.to_string();

    let mut w = Vec::new();
    writeln!(&mut w).unwrap();
    writeln!(&mut w, "# {} issue{} found for {}", &issues_length, seperator, &website_url).unwrap();
    writeln!(&mut w, "<details>").unwrap();
    writeln!(&mut w, "<summary>").unwrap();
    writeln!(&mut w, "Details").unwrap();
    writeln!(&mut w, "</summary>").unwrap();
    writeln!(&mut w, "").unwrap();

    for issue in website.issues {
        writeln!(&mut w, "<strong>{}</strong> <em>{}</em>", issue.issue_type.to_uppercase(), issue.code).unwrap();
        writeln!(&mut w, "").unwrap();
        writeln!(&mut w, "```html").unwrap();
        writeln!(&mut w, "{}", issue.context.trim_end()).unwrap();
        writeln!(&mut w, "```").unwrap();
        writeln!(&mut w, "").unwrap();
        writeln!(&mut w, "{}", issue.message).unwrap();
        writeln!(&mut w).unwrap();
        writeln!(&mut w, "---").unwrap();
        writeln!(&mut w).unwrap();
    }
    
    writeln!(&mut w, "</details>").unwrap();
    writeln!(&mut w, "").unwrap();
    writeln!(&mut w, "---").unwrap();
    writeln!(&mut w, "").unwrap();

    write!(&mut w, "[📝 docs](https://docs.a11ywatch.com) | ").unwrap();
    write!(&mut w, "[:octocat: repo](https://github.com/A11yWatch/a11ywatch) | ").unwrap();
    write!(&mut w, "[🙋🏽‍♀️ issues](https://github.com/A11yWatch/a11ywatch/issues) | ").unwrap();
    write!(&mut w, "[🏪 marketplace](https://github.com/marketplace/actions/a11ywatch-the-accessibility-suite) | ").unwrap();
    write!(&mut w, "[A11yWatch](https://a11ywatch.com)").unwrap();

    writeln!(&mut w, "").unwrap();
    writeln!(&mut w, "").unwrap();

    let body = str::from_utf8(&w).unwrap();

    json!({
        "body": body,
    })
}