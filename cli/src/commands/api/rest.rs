use crate::fs::temp::TempFs;
use crate::utils::Website;
use crate::EXTERNAL;
use reqwest::header::{HeaderMap, HeaderValue};
use reqwest::Client;
use reqwest::Error;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::env;
use std::time::Instant;

/// single scan audit api results
#[derive(Deserialize, Serialize, Debug, Default, Clone)]
pub struct ApiResult {
    pub data: Option<Website>,
    pub success: bool,
    message: String,
    code: Option<i32>,
}

// site wide crawl results
#[derive(Deserialize, Serialize, Debug, Default, Clone)]
pub struct CrawlApiResult {
    pub data: Option<Vec<Website>>,
    pub success: bool,
    message: String,
    code: Option<i32>,
}

/// crawl form
#[derive(Debug, Serialize, Deserialize)]
struct CrawlForm {
    url: String,
    tld: bool,
    subdomains: bool,
    norobo: bool,
    sitemap: bool,
}

#[derive(Debug, Default)]
pub(crate) struct ApiClient {}

impl ApiClient {
    // Single page scan
    #[tokio::main]
    pub async fn scan_website(url: &str, file_manager: &TempFs) -> Result<ApiResult, Error> {
        let target_destination: String = match env::var(EXTERNAL) {
            Ok(_) => "https://api.a11ywatch.com",
            Err(_) => "http://127.0.0.1:3280",
        }
        .to_string();

        let request_destination = format!("{}/api/scan", target_destination);
        let token = file_manager.get_token();

        let client = reqwest::Client::new();

        let mut map = HashMap::new();
        map.insert("url", url);

        let start = Instant::now();
        let mut resp: ApiResult = client
            .post(&request_destination)
            .bearer_auth(token)
            .json(&map)
            .send()
            .await?
            .json()
            .await?;
        let duration = start.elapsed();

        resp.message = format!("Scan completed in {:?}", duration);

        Ok(resp)
    }

    /// Site wide scan [Stream]
    #[tokio::main]
    pub async fn crawl_website(
        url: &str,
        subdomains: &bool,
        tld: &bool,
        norobo: &bool,
        file_manager: &TempFs,
        sitemap: &bool,
    ) -> Result<CrawlApiResult, Error> {
        let target_destination: String = match env::var(EXTERNAL) {
            Ok(_) => "https://api.a11ywatch.com",
            Err(_) => "http://127.0.0.1:3280",
        }
        .to_string();

        let request_destination = format!("{}/api/crawl", target_destination);
        let token = file_manager.get_token();

        let mut headers = HeaderMap::new();
        headers.insert("Transfer-Encoding", HeaderValue::from_static("chunked"));

        let client = Client::builder().default_headers(headers).build();

        let body = CrawlForm {
            url: url.into(),
            tld: *tld,
            subdomains: *subdomains,
            norobo: *norobo,
            sitemap: *sitemap,
        };

        let start = Instant::now();
        
        let resp: Vec<ApiResult> = client?
            .post(&request_destination)
            .bearer_auth(token)
            .json(&body)
            .send()
            .await?
            .json()
            .await?;

        let mut results: CrawlApiResult = CrawlApiResult::default();
        let mut data = Vec::with_capacity(resp.len());

        let duration = start.elapsed();

        let res_len = resp.len();
        let mut res_end = "s";
        if res_len == 1 {
            res_end = "";
        }

        results.message = format!("Crawled {} page{} in {:?}", res_len, res_end, duration);
        results.success = true;

        // todo: update API to match CrawlAPiResults of ApiResults instead
        if res_len > 0 {
            for item in resp {
                match item.data {
                    Some(website) => {
                        data.push(website);
                    }
                    _ => (),
                }
            }
        }

        results.data = Some(data);

        Ok(results)
    }
}

#[cfg(test)]
mod tests {
    use super::ApiClient;
    use super::TempFs;

    #[test]
    fn scan_website() {
        let results = ApiClient::scan_website(&"http://a11ywatch.com", &TempFs::new());
        let status = results.unwrap();

        assert_eq!(status.data.unwrap().url, "http://a11ywatch.com");
    }

    #[test]
    fn crawl_website() {
        let results = ApiClient::crawl_website(
            &"http://a11ywatch.com",
            &false,
            &false,
            &false,
            &TempFs::new(),
            &false,
        );
        let status = results.unwrap();

        assert_eq!(status.data.unwrap().len() > 1, true);
    }
}
