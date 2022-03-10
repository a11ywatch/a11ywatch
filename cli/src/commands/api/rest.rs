use crate::utils::{Website};
use serde::{Deserialize, Serialize};
use crate::EXTERNAL;
use std::env;
use ureq::{Error, post, json};

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
    pub fn scan_website(url: &str) -> Result<ApiResult, Error> {
        let target_destination: String = match env::var(EXTERNAL) {
            Ok(_) => "https://api.a11ywatch.com",
            Err(_) => "http://127.0.0.1:3280",
        }.to_string();

        let request_destination = format!("{}/api/scan-simple", target_destination);

        let resp: String = post(&request_destination)
        .send_json(json!({
            "websiteUrl": url
        }))?
        .into_string()?;

        let result: ApiResult = serde_json::from_str(&resp).unwrap();

        Ok(result)
    }
}

#[cfg(test)]
mod tests {
    use super::ApiClient;

    #[test]
    fn scan_website() {
        let results = ApiClient::scan_website(&"http://a11ywatch.com");
        let status = results.unwrap();
        
        assert_eq!(status.data.url, "http://a11ywatch.com");
    }
}