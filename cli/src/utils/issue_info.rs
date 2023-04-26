use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug, Default, Clone)]
pub struct IssueMeta {
    #[serde(rename = "skipContentIncluded")]
    pub skip_content_included: bool,
}

#[derive(Deserialize, Serialize, Debug, Default, Clone)]
pub struct IssueInfo {
    #[serde(rename = "accessScore")]
    pub access_score: i32,
    #[serde(rename = "totalIssues")]
    pub total_issues: i32,
    #[serde(rename = "errorCount")]
    pub error_count: i32,
    #[serde(rename = "warningCount")]
    pub warning_count: i32,
    #[serde(rename = "noticeCount")]
    pub notice_count: i32,
    #[serde(rename = "issueMeta")]
    pub issue_meta: IssueMeta,
}
