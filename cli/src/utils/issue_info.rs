use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug, Default)]
pub struct IssueInfo {
    #[serde(rename = "totalIssues")]
    pub total_issues: String,
    #[serde(rename = "possibleIssuesFixedByCdn")]
    pub possible_issues_fixed_by_cdn: String,
    #[serde(rename = "issuesFixedByCdn")]
    pub issues_fixed_by_cdn: String,
    #[serde(rename = "errorCount")]
    pub error_count: String,
    #[serde(rename = "warningCount")]
    pub warning_count: String,
    #[serde(rename = "limitedCount")]
    pub limited_count: i64,
}