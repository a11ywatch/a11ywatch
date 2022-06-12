use convert_case::{Case, Casing};
use serde_json::json;
use std::collections::HashMap;

/// generate fetch wrapper
pub fn generate_controller(path: &str, method: &str, headers: Option<&HashMap<String, String>>) -> String {
    // TODO: adjust comment name based on desc
    let head_comment = format!("Make api call for the path {} REST endpoint", path);
    let promise_return = r#" @returns Promise<{data: any, status: number, message: string}> Returns a standard REST API response."#;

    let head = &format!(r#"
/**
 * {}.
 * {}
 */"#, head_comment, promise_return).trim_start().to_owned();

    let options = if !headers.is_none() {
        json!({
            "method": method,
            "headers": headers.unwrap() // no default set
        })
    } else {
        json!({
            "method": method,
        })
    };

    let controller_head: &String  = &format!(r#"export const {}Call = async (params: any, token?: string) => {}"#, path.to_case(Case::Camel), "{");
    let controller_body: &String  = &format!("return await request('{}', params, {}, token).catch((e) => console.error(e))", path, options.to_string());
    let controller_end: &str  = "}";

    format!(r#"
{head}
{controller_head}
    {controller_body}
{controller_end}
    "#)
}

/// request import
pub fn generate_controller_imports() -> &'static str {
    &r#"
import { request } from "./request"
"#.trim_start()
}

