use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug, Default, Clone)]
pub struct IssueMeta {
    #[cfg(feature = "litemode")]
    #[serde(rename = "skipContentIncluded")]
    pub skip_content_included: Option<bool>,
    #[serde(rename = "missingAltCount")]
    pub missing_alt_count: Option<u32>,
}

#[derive(Deserialize, Serialize, Debug, Default, Clone)]
pub struct IssueInfo {
    #[serde(rename = "accessScore")]
    pub access_score: i32,
    #[serde(rename = "totalIssues")]
    pub total_issues: u32,
    // deprecated old a11ywatch pre v0.0.1
    // #[serde(rename = "possibleIssuesFixedByCdn")]
    // pub possible_issues_fixed_by_cdn: i32,
    // #[serde(rename = "issuesFixedByCdn")]
    // pub issues_fixed_by_cdn: i32,
    #[serde(rename = "errorCount")]
    pub error_count: u32,
    #[serde(rename = "warningCount")]
    pub warning_count: u32,
    #[serde(rename = "noticeCount")]
    pub notice_count: u32,
    #[serde(rename = "issueMeta")]
    pub issue_meta: IssueMeta,
}
