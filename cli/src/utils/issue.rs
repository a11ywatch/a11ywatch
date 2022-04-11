use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Issue {
    #[serde(rename = "type")]
    pub issue_type: String,
    #[serde(rename = "typeCode")]
    pub type_code: String,
    pub code: String,
    pub context: String,
    pub message: String,
    pub selector: String,
}