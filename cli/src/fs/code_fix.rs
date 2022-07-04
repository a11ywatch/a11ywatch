use super::install::assure_module_exist;
use crate::Issue;
use serde_json::Value;
use std::fs::File;
use std::io::Read;
use std::io::Write;
use std::path::Path;
use std::process::Command;

/// get replace_context [TODO: pass in property]
pub fn establish_context(context: String, rec: &str, alt_matcher: &String) -> String {
    // Alt code fix
    if rec.starts_with(alt_matcher) {
        let rec = &rec.replace(alt_matcher, "");
        let alt_index = context.find(r#"alt="""#).unwrap_or(0);
        let replace_context = if alt_index != 0 {
            context.replace(r#"alt="""#, &format!(r#"alt="{rec}""#))
        } else {
            format!(r#"{} alt="{}""#, context, rec)
        };

        return replace_context;
    }

    String::from("")
}

/// apply code fixes for the issues
pub fn apply_fix(json_results: &Value) {
    assure_module_exist("ripgrep");
    let data = &*json_results.get("data").unwrap();
    const RECCOMENDATION: &str = "Recommendation:";

    if data.is_object() {
        let issues = data.get("issues").unwrap();

        if issues.is_array() {
            // TODO: move to lazy static.
            let alt_matcher = format!("{RECCOMENDATION} set the alt prop to - ");

            for issue in issues.as_array() {
                for item in issue.clone() {
                    let iss: Issue = serde_json::from_value(item).unwrap();
                    let message = iss.message.to_string();

                    if message.contains(&RECCOMENDATION) {
                        let context = iss.context.to_string();
                        // TODO: determine property to add or adjust based on recommendation.
                        let rec_index = message.find(&RECCOMENDATION).unwrap_or(0);
                        // reccomendation exist, attempt to map code fix.
                        if rec_index != 0 {
                            let rec = &message[rec_index..];
                            let rec: String = rec.to_owned().to_string(); // recommendation
                            let context: String = context.clone();
                            let replace_end = if context.ends_with("/>") { "/>" } else { ">" };
                            // trim tags from start and end
                            let context = context.replace("<", "");
                            let context = context.replace(replace_end, "");
                            let replace_context =
                                establish_context(context.clone(), &rec, &alt_matcher);

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
                                    let mut data = String::new();
                                    src.read_to_string(&mut data).unwrap();
                                    drop(src);
                                    let new_data = data.replace(&*context, &*replace_context);
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
