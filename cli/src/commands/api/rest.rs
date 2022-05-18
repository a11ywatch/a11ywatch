use crate::utils::{Website};
use serde::{Deserialize, Serialize};
use crate::EXTERNAL;
use std::env;
use ureq::{Error, post, json};
use crate::fs::temp::{TempFs};

#[derive(Deserialize, Serialize, Debug, Default)]
pub struct ApiResult {
    data: Website,
    code: u32,
    success: bool,
    message: String,
}

// site wide crawl long job handling
#[derive(Deserialize, Serialize, Debug, Default)]
pub struct CrawlApiResult {
    data: Vec<Website>,
    code: u32,
    success: bool,
    message: String,
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
    // Site wide scan
    pub fn crawl_website(url: &str, file_manager: &TempFs) -> Result<CrawlApiResult, Error> {
        let target_destination: String = match env::var(EXTERNAL) {
            Ok(_) => "https://api.a11ywatch.com",
            Err(_) => "http://127.0.0.1:3280",
        }.to_string();

        let request_destination = format!("{}/api/crawl", target_destination);
        let token = file_manager.get_token();
        
        let resp: CrawlApiResult = if !token.is_empty() {
            post(&request_destination)
            .set("Authorization", &token)
        } else {
            post(&request_destination)
        }.send_json(json!({
            "websiteUrl": url
        }))?.into_json()?;

        Ok(resp)
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