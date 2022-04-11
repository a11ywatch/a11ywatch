use serde::{Deserialize, Serialize};
use crate::utils::{IssueInfo, Issue};

#[derive(Deserialize, Serialize, Debug)]
pub struct Website {
    pub url: String,
    pub domain: String,
    #[serde(rename = "issuesInfo")]
    pub issues_info: IssueInfo,
    #[serde(rename = "adaScore")]
    pub ada_score: String,
    pub issue: Vec<Issue>,
}