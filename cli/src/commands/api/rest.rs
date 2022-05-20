use serde::{Deserialize, Serialize};
use std::env;
use ureq::{Error, post, json};
use std::time::Duration;
use crate::utils::{Website};
use crate::EXTERNAL;
use crate::fs::temp::{TempFs};

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
    // /// Site wide scan
    // pub fn _walk_website(url: &str, file_manager: &TempFs) -> Result<CrawlApiResult, Error> {
    //     let target_destination: String = match env::var(EXTERNAL) {
    //         Ok(_) => "https://api.a11ywatch.com",
    //         Err(_) => "http://127.0.0.1:3280",
    //     }.to_string();

    //     let request_destination = format!("{}/api/crawl", target_destination);
    //     let token = file_manager.get_token();
            
    //     let resp: CrawlApiResult = if !token.is_empty() {
    //         post(&request_destination)
    //         .set("Authorization", &token)
    //     } else {
    //         post(&request_destination)
    //     }.send_json(json!({
    //         "websiteUrl": url
    //     }))?.into_json()?;

    //     Ok(resp)
    // }

    /// Site wide scan [Stream]
    pub fn crawl_website(url: &str, file_manager: &TempFs) -> Result<CrawlApiResult, Error> {
        let target_destination: String = match env::var(EXTERNAL) {
            Ok(_) => "https://api.a11ywatch.com",
            Err(_) => "http://127.0.0.1:3280",
        }.to_string();

        let request_destination = format!("{}/api/crawl-stream", target_destination);
        let token = file_manager.get_token();
        
        let agent = ureq::builder()
            .timeout(Duration::from_secs(500))
            .build();
            
        let resp: Vec<CrawlApiResult> = if !token.is_empty() {
            agent.post(&request_destination)
            .set("Transfer-Encoding", "chunked")
            .set("Authorization", &token)
        } else {
            agent.post(&request_destination)
            .set("Transfer-Encoding", "chunked")
        }.send_json(json!({
            "websiteUrl": url
        }))?.into_json()?;

        let mut results: CrawlApiResult = CrawlApiResult::default();

        // Get the first valid results. TODO: use real time stream endpoint for results.
        for r in &resp {
            let default_data: Vec<Website> = Vec::new();
            let data = r.data.as_ref().unwrap_or(&default_data);

            if !data.is_empty() {
                results = r.to_owned();
            };
        };

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