use crate::utils::{Website};
use serde::{Deserialize, Serialize};
use crate::EXTERNAL;
use std::env;
use ureq::{Error, post, json};
use crate::fs::temp::{TempFs};

#[derive(Deserialize, Serialize, Debug)]
pub struct ApiResult {
    #[serde(rename = "website")]
    data: Website,
    code: u32,
    success: bool,
    message: String,
}

#[derive(Debug, Default)]
pub(crate) struct ApiClient {}

impl ApiClient {
    /// Scan a website for issues single or multi page.
    /// Multi page scans require front-end client usage to determine errors ATM.
    pub fn scan_website(url: &str, file_manager: &TempFs, target_path: &str) -> Result<ApiResult, Error> {
        let target_destination: String = match env::var(EXTERNAL) {
            Ok(_) => "https://api.a11ywatch.com",
            Err(_) => "http://127.0.0.1:3280",
        }.to_string();
        
        let request_destination = format!("{}/api/{}", target_destination, target_path);
        let token = file_manager.get_token();
        
        let resp: ApiResult = post(&request_destination)
        .set("Authorization", &token)
        .send_json(json!({
            "websiteUrl": url
        }))?
        .into_json()?;

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
}