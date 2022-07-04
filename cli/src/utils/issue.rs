use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone, Default)]
pub struct Issue {
    #[serde(rename = "type")]
    pub issue_type: String,
    #[serde(rename = "typeCode")]
    pub type_code: i32,
    pub code: String,
    pub context: String,
    pub message: String,
    pub selector: String,
    pub runner: String,
    pub recurrence: i32,
}
