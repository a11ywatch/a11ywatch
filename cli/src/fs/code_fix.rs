use super::install::assure_module_exist;
use crate::Issue;
use htr::convert_props_react;
use serde_json::Value;
use std::fs::File;
use std::io::Read;
use std::io::Write;
use std::path::Path;
use std::process::Command;

const RECCOMENDATION: &str = "Recommendation:";
const MATCH_ALT: &str = "Recommendation: change alt to ";
const MATCH_BACKGROUND: &str = "Recommendation: change background to ";
const MATCH_TEXT_COLOR: &str = "Recommendation: change text colour to ";

const PROPERTY_MATCHERS: [(&'static str, &'static str); 3] = [
    (MATCH_BACKGROUND, "background"),
    (MATCH_TEXT_COLOR, "color"),
    (MATCH_ALT, "alt"),
];

/// determine if project is react
pub fn determine_react_project() -> bool {
    let rg_command = Command::new("rg")
        .args([r#""react":"#, "package.json"])
        .output()
        .expect("Failed to execute ripgrep replace");
    let stdout = String::from_utf8(rg_command.stdout).unwrap();

    !stdout.is_empty()
}

/// determine actual fix for code. Returns empty string if no matchers found.
pub fn establish_context(context: String, rec: &str, react_project: bool) -> String {
    let replace_context: String;

    match PROPERTY_MATCHERS {
        [.., (des, value)] if rec.starts_with(&(*des)) => {
            let v = &rec.replace(des, "");
            let val = format!(r#"{value}="#);
            let value_index = context.find(&val).unwrap_or(0);
            let mut exact_value: String = String::from("");

            if value_index != 0 {
                for (i, c) in context[value_index..].chars().enumerate() {
                    exact_value.push(c);
                    let mut string_index = if value == "alt" { 0 } else { 1 };
                    let mut first_str = exact_value.get(..string_index).unwrap_or_default();
                    while first_str.is_empty() {
                        string_index = string_index + 1;
                        first_str = exact_value.get(..string_index).unwrap_or_default();
                    }
                    if i != 0 && c.to_string() == first_str {
                        break;
                    }
                }
            }

            replace_context = if !exact_value.is_empty() {
                let q = exact_value.chars().last().unwrap();
                let target_value = if value == "alt" {
                    format!(r#"{value}={q}{v}{q}"#)
                } else {
                    if react_project {
                        format!(r#"{value}:{q}{v}{q}"#)
                    } else {
                        format!(r#"{value}:{q}{v}{q};"#)
                    }
                };
                context.replace(&format!("{exact_value}"), &target_value)
            } else {
                let target_value = if value == "alt" {
                    format!(r#"{context} {value}="{v}""#)
                } else {
                    if react_project {
                        format!(r#"{context} style={{ "{value}": "{v}" }}"#)
                    } else {
                        // TODO: check if style in context to append.
                        format!(r#"{context} style="{value}: {v};""#)
                    }
                };

                target_value
            };
        }
        _ => {
            replace_context = String::from("");
        }
    };

    replace_context
}

/// apply code fixes for the issues
pub fn apply_fix(json_results: &Value) {
    let data = &*json_results.get("data").unwrap();

    if data.is_object() {
        let issues = data.get("issues").unwrap();

        if issues.is_array() {
            assure_module_exist("ripgrep");
            let react_project = determine_react_project();
            while let Some(issue) = issues.as_array() {
                for item in issue.clone() {
                    let iss: Issue = serde_json::from_value(item).unwrap();
                    let message = iss.message.to_string();

                    if message.contains(&RECCOMENDATION) {
                        let context = iss.context.to_string();
                        let rec_index = message.find(&RECCOMENDATION).unwrap_or(0);

                        if rec_index != 0 {
                            let rec = &message[rec_index..];
                            let rec: String = rec.to_owned().to_string(); // recommendation
                            let mut context: String = context.clone();

                            if react_project {
                                context = convert_props_react(&context);
                            }

                            let replace_end = if context.ends_with("/>") { "/>" } else { ">" };
                            // trim tags from start and end
                            let context = context.replace("<", "");
                            let context = context.replace(replace_end, "");
                            let replace_context =
                                establish_context(context.clone(), &rec, react_project);

                            // apply code changes if recommendation exist.
                            if !replace_context.is_empty() {
                                let rg_command = Command::new("rg")
                                    .args([&context, &"-r".to_string(), &replace_context])
                                    .output()
                                    .expect("Failed to execute ripgrep replace");

                                let stdout = String::from_utf8(rg_command.stdout).unwrap();

                                //  TODO: get rg line number and jump to line.
                                if !stdout.is_empty() {
                                    let pfx = &stdout[..stdout.find(':').unwrap()];
                                    let path = Path::new(&pfx);
                                    let mut src = File::open(&path).unwrap();
                                    let mut ds = String::new();
                                    src.read_to_string(&mut ds).unwrap();
                                    drop(src);
                                    let new_data = ds.replace(&*context, &*replace_context);
                                    let mut s = File::create(&path).unwrap();
                                    s.write(new_data.as_bytes()).unwrap();
                                }
                            }
                        }
                    }
                }
            }
        }
    } else if data.is_array() {
        let react_project = determine_react_project();
        while let Some(d) = data.as_array() {
            for item in d.clone() {
                let it = item.clone();
                let issues = it.get("issues").unwrap();

                if issues.is_array() {
                    assure_module_exist("ripgrep");
                    if let Some(issue) = issues.as_array() {
                        for item in issue.clone() {
                            let iss: Issue = serde_json::from_value(item).unwrap();
                            let message = iss.message.to_string();

                            if message.contains(&RECCOMENDATION) {
                                let context = iss.context.to_string();
                                let rec_index = message.find(&RECCOMENDATION).unwrap_or(0);
                                // recommendation exist, attempt to map code fix.
                                if rec_index != 0 {
                                    let rec = &message[rec_index..];
                                    let rec: String = rec.to_owned().to_string(); // recommendation
                                    let mut context: String = context.clone();

                                    if react_project {
                                        context = convert_props_react(&context);
                                    }

                                    let replace_end =
                                        if context.ends_with("/>") { "/>" } else { ">" };
                                    // trim tags from start and end
                                    let context = context.replace("<", "");
                                    let context = context.replace(replace_end, "");
                                    let replace_context =
                                        establish_context(context.clone(), &rec, react_project);

                                    // apply code changes if recommendation exist.
                                    if !replace_context.is_empty() {
                                        let rg_command = Command::new("rg")
                                            .args([&context, &"-r".to_string(), &replace_context])
                                            .output()
                                            .expect("Failed to execute ripgrep replace");

                                        let stdout = String::from_utf8(rg_command.stdout).unwrap();

                                        //  TODO: get rg line number and jump to line.
                                        if !stdout.is_empty() {
                                            let pfx = &stdout[..stdout.find(':').unwrap()];
                                            let path = Path::new(&pfx);
                                            let mut src = File::open(&path).unwrap();
                                            let mut ds = String::new();
                                            src.read_to_string(&mut ds).unwrap();
                                            drop(src);
                                            let new_data = ds.replace(&*context, &*replace_context);
                                            let mut s = File::create(&path).unwrap();
                                            s.write(new_data.as_bytes()).unwrap();
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
