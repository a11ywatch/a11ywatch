use crate::utils::{Issue, IssueInfo};
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug, Default, Clone)]
pub struct LightHouse {
    pub json: String,
}

#[derive(Deserialize, Serialize, Debug, Default, Clone)]
pub struct PageLoadTime {
    pub duration: i32,
    #[serde(rename = "durationFormated")]
    pub duration_formated: String,
    pub color: String,
}

#[derive(Deserialize, Serialize, Debug, Default, Clone)]
pub struct Website {
    pub url: String,
    pub domain: String,
    #[serde(rename = "cdnConnected")]
    pub cdn_connected: Option<bool>,
    #[serde(rename = "issuesInfo")]
    pub issues_info: Option<IssueInfo>,
    /// list of issues the website has
    pub issues: Option<Vec<Issue>>,
    /// is the website online
    pub online: Option<bool>,
    #[serde(rename = "lastScanDate")]
    pub last_scan_date: Option<String>,
    pub insight: Option<LightHouse>,
    #[serde(rename = "pageLoadTime")]
    pub page_load_time: Option<PageLoadTime>,
}
