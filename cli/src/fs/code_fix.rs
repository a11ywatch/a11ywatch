use std::process::Command;
use serde_json::Value;
use crate::Issue;
use std::path::Path;
use std::io::Write;
use std::fs::File;
use std::io::Read;

/// make sure runtime module exist. License must be compatible.
pub fn assure_module_exist(module: &str) {
    let bin_name = if module == "ripgrep" {
        "rg"
    } else {
        module
    };
    let path = Path::new(&dirs::home_dir().unwrap_or_default())
        .join(format!(".cargo/bin/{bin_name}"));
    
    if !Path::new(&path).exists() {
        println!("Installing required rust {module} for code fix...");
        Command::new("cargo")
            .args(["install", module])
            .status()
            .expect("Failed to execute cargo install {module}");
    }
}

/// apply code fixes for the issues
pub fn apply_fix(json_results: &Value) {
    assure_module_exist("ripgrep");
    let data = &*json_results.get("data").unwrap();

    if data.is_object() {
        let issues = data.get("issues").unwrap();

        if issues.is_array() {
            // TODO: move to lazy static.
            let alt_matcher = "Recommendation: set the alt prop to - ";

            for issue in issues.as_array() {
                for item in issue.clone() {
                    let iss: Issue = serde_json::from_value(item).unwrap();
                    let message = iss.message.to_string();
                    
                    if message.contains("Recommendation:") {
                        let context = iss.context.to_string();
                        // TODO: determine property to add or adjust based on recommendation.
                        let rec_index = message.find("Recommendation:").unwrap_or(0);
                        // reccomendation exist, attempt to map code fix.
                        if rec_index != 0 {
                            let rec = &message[rec_index..];
                            let mut rec: String = rec.to_owned().to_string(); // recommendation
                            let context: String = context.clone();
                            let replace_end = if context.ends_with("/>") {
                                "/>"
                            } else {
                                ">"
                            };
                            // trim tags from start and end
                            let context = context.replace("<", "");
                            let context = context.replace(replace_end, "");
                            let mut replace_context = context.clone();

                            // Alt code fix
                            if rec.starts_with(&alt_matcher) {
                                rec = rec.replace(alt_matcher, "");
                                let alt_index = context.find(r#"alt="""#).unwrap_or(0);
                                if alt_index != 0 {
                                    replace_context = replace_context.replace(r#"alt="""#, &format!(r#"alt="{rec}""#));
                                } else {
                                    replace_context = format!(r#"{} alt="{}""#, replace_context, rec)
                                }
                            }
                            
                            // apply code changes.
                            if replace_context != context {
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
                                    let mut data = String::new();
                                    src.read_to_string(&mut data).unwrap();
                                    drop(src);
                                    let new_data = data.replace(&*context, &*replace_context);
                                    let mut s = File::create(&path).unwrap();
                                    s.write(new_data.as_bytes()).unwrap();

                                    println!("Updating {pfx}: [ {context} - {replace_context} ]")
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}