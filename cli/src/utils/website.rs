use serde::{Deserialize, Serialize};
use crate::utils::{IssueInfo, Issue};

#[derive(Deserialize, Serialize, Debug, Default, Clone)]
pub struct Website {
    pub url: String,
    pub domain: String,
    #[serde(rename = "cdnConnected")]
    pub cdn_connected: bool,
    #[serde(rename = "issuesInfo")]
    pub issues_info: IssueInfo,
    pub issues: Option<Vec<Issue>>,
}