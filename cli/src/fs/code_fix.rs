use std::process::Command;
use serde_json::Value;

use crate::Issue;

/// apply code fixes for the issues
pub fn apply_fix(json_results: &Value) {
    let data = &*json_results.get("data").unwrap();

    if data.is_object() {
        let issues = data.get("issues").unwrap();

        if issues.is_array() {
            for issue in issues.as_array() {
                for item in issue.clone() {
                    let iss: Issue = serde_json::from_value(item).unwrap();
                    let q = iss.context.to_string();
                    // TODO: parse fix from string at reccomendation:
                    let qp = format!("{}-test", q);
                    // TODO: use ripgrep as lib check to see if rg is installed if not install first.
                    Command::new("rg")
                        .args([q, "-r".to_string(), qp])
                        .status()
                        .expect("Failed to execute ripgrep replace");
                }

            }
        }
    }
}