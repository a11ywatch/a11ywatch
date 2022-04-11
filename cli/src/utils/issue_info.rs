use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug)]
pub struct IssueInfo {
    #[serde(rename = "totalIssues")]
    pub total_issues: i32,
    #[serde(rename = "possibleIssuesFixedByCdn")]
    pub possible_issues_fixed_by_cdn: i32,
    #[serde(rename = "issuesFixedByCdn")]
    pub issues_fixed_by_cdn: i32,
    #[serde(rename = "errorCount")]
    pub error_count: i32,
    #[serde(rename = "warningCount")]
    pub warning_count: i32,
    #[serde(rename = "limitedCount")]
    pub limited_count: i32,
}