use serde::{Deserialize, Serialize};
use std::env;
use ureq::{Error, post, json};
use crate::utils::{Website};
use crate::EXTERNAL;
use crate::fs::temp::{TempFs};
use std::time::{Instant};

#[derive(Deserialize, Serialize, Debug, Default)]
pub struct ApiResult {
    data: Option<Website>,
    success: bool,
    message: String,
    code: i32
}

// site wide crawl long job handling
#[derive(Deserialize, Serialize, Debug, Default, Clone)]
pub struct CrawlApiResult {
    data: Option<Vec<Website>>,
    success: bool,
    message: String,
    code: i32
}

#[derive(Debug, Default)]
pub(crate) struct ApiClient {}

impl ApiClient {
    // Single page scan
    pub fn scan_website(url: &str, file_manager: &TempFs) -> Result<ApiResult, Error> {
        let target_destination: String = match env::var(EXTERNAL) {
            Ok(_) => "https://api.a11ywatch.com",
            Err(_) => "http://127.0.0.1:3280",
        }.to_string();

        let request_destination = format!("{}/api/scan-simple", target_destination);
        let token = file_manager.get_token();

        let resp: ApiResult = if !token.is_empty() {
            post(&request_destination)
            .set("Authorization", &token)
        } else {
           post(&request_destination)
        }.send_json(json!({
            "websiteUrl": url
        }))?.into_json()?;

        Ok(resp)
    }

    /// Site wide scan [Stream]
    pub fn crawl_website(url: &str, file_manager: &TempFs) -> Result<CrawlApiResult, Error> {
        let target_destination: String = match env::var(EXTERNAL) {
            Ok(_) => "https://api.a11ywatch.com",
            Err(_) => "http://127.0.0.1:3280",
        }.to_string();

        let request_destination = format!("{}/api/crawl-stream", target_destination);
        let token = file_manager.get_token();
        let agent = ureq::agent();

        let start = Instant::now();
        let resp = if !token.is_empty() {
            agent.post(&request_destination)
            .set("Transfer-Encoding", "chunked")
            .set("Authorization", &token)
        } else {
            agent.post(&request_destination)
            .set("Transfer-Encoding", "chunked")
        }.send_json(json!({
            "websiteUrl": url
        }))?;
        let mut resp = resp.into_string().unwrap();
        let duration = start.elapsed();
        let len = resp.len();
        let contains_trailing_comma = &resp[len-2..];

        // remove trailing comma from string
        if !contains_trailing_comma.is_empty() {
            resp.pop();
            resp.pop();
            resp.push(']');
        }

        let resp: Vec<ApiResult> = serde_json::from_str(&resp).unwrap();

        let mut results: CrawlApiResult = CrawlApiResult::default();
        let mut data_container: Vec<Website> = Vec::new();

        for r in &resp {
            let default_data: Website = Default::default();
            let data = r.data.as_ref().unwrap_or(&default_data).to_owned();
            data_container.push(data);
        };

        let res_len = data_container.len();
        let mut res_end = "s";
        if res_len == 1 {
            res_end = "";
        }

        results.data = Some(data_container);
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
        let results = ApiClient::scan_website(&"http://a11ywatch.com", &TempFs::new());
        let status = results.unwrap();
        
        assert_eq!(status.data.url, "http://a11ywatch.com");
    }

    #[test]
    fn crawl_website() {
        let results = ApiClient::crawl_website(&"http://a11ywatch.com", &TempFs::new());
        let status = results.unwrap();
        
        assert_eq!(status.data.len() > 1, true);
    }
}