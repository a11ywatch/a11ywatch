use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Issue {
    #[serde(rename = "type")]
    pub issue_type: String,
    #[serde(rename = "typeCode")]
    pub type_code: u32,
    // the error code ex WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Alpha 
    pub code: String,
    pub context: String,
    pub message: String,
    pub selector: String,
}