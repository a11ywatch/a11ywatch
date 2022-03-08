use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Issue {
    #[serde(rename = "type")]
    pub issue_type: String,
    #[serde(rename = "typeCode")]
    pub type_code: u32,
    pub code: String,
    pub context: String,
    pub message: String,
    pub selector: String,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct IssuesInfo {
    #[serde(rename = "totalIssues")]
    pub total_issues: u32,
    #[serde(rename = "possibleIssuesFixedByCdn")]
    pub possible_issues_fixed_by_cdn: u32,
    #[serde(rename = "issuesFixedByCdn")]
    pub issues_fixed_by_cdn: u32,
    #[serde(rename = "errorCount")]
    pub error_count: u32,
    #[serde(rename = "warningCount")]
    pub warning_count: u32,
    #[serde(rename = "limitedCount")]
    pub limited_count: u32,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Website {
    pub url: String,
    pub domain: String,
    #[serde(rename = "issuesInfo")]
    pub issues_info: IssuesInfo,
    #[serde(rename = "adaScore")]
    pub ada_score: u32,
    pub issue: Vec<Issue>,
    pub screenshot: String,
    #[serde(rename = "screenshotStill")]
    pub screenshot_still: String
}