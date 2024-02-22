use serde::{Deserialize, Serialize};

#[cfg(feature = "litemode")]
use crate::rpc::client::apicore::Page;
use crate::utils::{Issue, IssueInfo};

#[derive(Deserialize, Serialize, Debug, Default, Clone)]
pub struct LightHouse {
    /// lighthouse report data as json string
    pub json: String,
}

#[derive(Deserialize, Serialize, Debug, Default, Clone)]
pub struct PageLoadTime {
    pub duration: u32,
    #[serde(rename = "durationFormated")]
    pub duration_formated: String,
    #[cfg(feature = "litemode")]
    pub color: String,
}

#[derive(Deserialize, Serialize, Debug, Default, Clone)]
pub struct Website {
    /// target url
    pub url: String,
    /// domain of the page
    pub domain: String,
    /// list of issues the website has
    pub issues: Option<Vec<Issue>>,
    /// is the website online
    pub online: Option<bool>,
    #[cfg(feature = "litemode")]
    /// lighthouse report data
    pub insight: Option<LightHouse>,
    /// js cdn connected on domain
    #[cfg(feature = "litemode")]
    #[serde(rename = "cdnConnected")]
    pub cdn_connected: Option<bool>,
    /// the user identifier
    #[cfg(not(feature = "litemode"))]
    #[serde(rename = "userId")]
    pub user_id: Option<u32>,
    #[serde(rename = "issuesInfo")]
    pub issues_info: Option<IssueInfo>,
    #[serde(rename = "pageLoadTime")]
    pub page_load_time: Option<PageLoadTime>,
    #[serde(rename = "lastScanDate")]
    pub last_scan_date: Option<String>,
}

#[cfg(feature = "litemode")]
/// convert to website from page
impl From<Page> for Website {
    fn from(page: Page) -> Self {
        let mut website = Website::default();

        website.url = page.url;
        website.domain = page.domain;
        website.cdn_connected = Some(page.cdn_connected);

        let issues_info = page.issues_info.unwrap_or_default();

        let issue_option = IssueInfo {
            error_count: issues_info.error_count,
            warning_count: issues_info.warning_count,
            access_score: issues_info.access_score,
            total_issues: issues_info.total_issues,
            issue_meta: crate::utils::issue_info::IssueMeta {
                skip_content_included: issues_info
                    .issue_meta
                    .unwrap_or_default()
                    .skip_content_included,
            },
            notice_count: issues_info.notice_count,
        };

        website.issues_info = Some(issue_option);
        website.last_scan_date = Some(page.last_scan_date);

        // todo: add trait compiled
        let issues: Vec<Issue> = page
            .issues
            .into_iter()
            .map(|i| Issue {
                issue_type: i.r#type, // todo: convert proto buffer to issueType
                type_code: i.type_code,
                code: i.code,
                context: i.context,
                message: i.message,
                selector: i.selector,
                runner: i.runner,
                recurrence: i.recurrence,
            })
            .collect();

        website.issues = Some(issues);

        website
    }
}
