use crate::fs::temp::TempFs;
use crate::utils::Website;
use crate::EXTERNAL;

use reqwest::blocking;
use reqwest::Error;
use serde::{Deserialize, Serialize};
use std::env;
use std::time::Instant;

pub static APP_USER_AGENT: &str = concat!(env!("CARGO_PKG_NAME"), "/", env!("CARGO_PKG_VERSION"),);

#[derive(Deserialize, Serialize, Debug, Default)]
pub struct ApiResult {
    pub data: Option<Website>,
    pub success: bool,
    pub message: Option<String>,
    pub code: i32,
}

// site wide crawl long job handling
#[derive(Deserialize, Serialize, Debug, Default, Clone)]
pub struct CrawlApiResult {
    pub data: Option<Vec<Website>>,
    pub success: bool,
    pub message: String,
    pub code: i32,
}

#[derive(Debug, Default)]
pub(crate) struct ApiClient {}

impl ApiClient {
    /// Single page scan
    #[allow(dead_code)]
    pub fn scan_website(url: &str, file_manager: &TempFs) -> Result<ApiResult, Error> {
        let target_destination: String = match env::var(EXTERNAL) {
            Ok(_) => "https://api.a11ywatch.com",
            Err(_) => "http://127.0.0.1:3280",
        }
        .to_string();

        let request_destination = format!("{}/api/scan-simple", target_destination);
        let token = file_manager.get_token();

        let client = blocking::Client::new();

        let body = format!(r#"{{ "websiteUrl": "{}" }}"#, url);

        let resp = if !token.is_empty() {
            client
                .post(&request_destination)
                .header("Authorization", &token)
        } else {
            client.post(&request_destination)
        }
        .header("Content-Type", "application/json; charset=utf-8")
        .body(body)
        .send()
        .unwrap();

        let resp: ApiResult = resp.json().unwrap_or_default();

        // TODO: add duration elasped
        Ok(resp)
    }

    /// Site wide scan [Stream]
    #[allow(dead_code)]
    pub fn crawl_website(
        url: &str,
        subdomains: &bool,
        tld: &bool,
        norobo: &bool,
        file_manager: &TempFs,
    ) -> Result<CrawlApiResult, Error> {
        let target_destination: String = match env::var(EXTERNAL) {
            Ok(_) => "https://api.a11ywatch.com",
            Err(_) => "http://127.0.0.1:3280",
        }
        .to_string();
        let request_destination = format!("{}/api/crawl-stream-slim", target_destination);
        let token = file_manager.get_token();
        let agent = blocking::Client::new();

        let start = Instant::now();

        let body = format!(
            r#"{{ "websiteUrl": "{}", "tld": {}, "subdomains": {}, "robots": {}  }}"#,
            url,
            tld,
            subdomains,
            norobo == &false
        );

        let resp = if !token.is_empty() {
            agent
                .post(&request_destination)
                .header("Transfer-Encoding", "chunked")
                .header("Authorization", &token)
        } else {
            agent
                .post(&request_destination)
                .header("Transfer-Encoding", "chunked")
        }
        .header("Content-Type", "application/json")
        .header("X-Request-Client", APP_USER_AGENT)
        .body(body)
        .send()
        .unwrap();

        let mut resp: Vec<Website> = resp.json().unwrap_or_default();

        let duration = start.elapsed();

        // an extra object is sent for the json stream ending requiring pop
        // this allows for fast streams
        resp.pop();

        let res_len = resp.len();
        let mut res_end = "s";
        if res_len == 1 {
            res_end = "";
        }

        let mut results: CrawlApiResult = CrawlApiResult::default();

        results.data = Some(resp);
        results.message = format!("Crawled {} page{} in {:?}", res_len, res_end, duration);
        results.success = true;

        Ok(results)
    }
}

#[cfg(test)]
mod tests {
    use super::ApiClient;
    use super::TempFs;

    #[test]
    fn scan_website() {
        let results = ApiClient::scan_website(&"https://a11ywatch.com", &TempFs::new());
        let status = results.unwrap();

        assert_eq!(status.data.unwrap().url, "https://a11ywatch.com");
    }

    #[test]
    fn crawl_website() {
        let results =
            ApiClient::crawl_website(&"https://a11ywatch.com", &false, &false, &TempFs::new());
        let status = results.unwrap();

        assert_eq!(status.data.unwrap().len() > 1, true);
    }
}
