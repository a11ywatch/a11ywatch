use serde::{Deserialize, Serialize};
use crate::utils::{IssueInfo, Issue};

#[derive(Deserialize, Serialize, Debug)]
pub struct Website {
    pub url: String,
    pub domain: String,
    #[serde(rename = "issuesInfo")]
    pub issues_info: IssueInfo,
    #[serde(rename = "adaScore")]
    pub ada_score: u32,
    pub issue: Vec<Issue>,
    pub screenshot: String,
    #[serde(rename = "screenshotStill")]
    pub screenshot_still: String
}