use serde_json::{from_str, Value};
use crate::fs::temp::{TempFs};

pub(crate) fn format_body(file_manager: TempFs) -> String {
    let file_results: String = file_manager.read_results();
    let v: Value = from_str(&file_results).unwrap();

    v.to_string()
}

