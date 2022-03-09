use serde::{Deserialize, Serialize};
use crate::shapes::Website;
use std::env;
use crate::EXTERNAL;
use reqwest;

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
    #[tokio::main]
    pub async fn scan_website(url: &str) -> reqwest::Result<ApiResult> {
        let target_destination: String = match env::var(EXTERNAL) {
            Ok(_) => "https://api.a11ywatch.com",
            Err(_) => "http://127.0.0.1:3280",
        }.to_string();

        let request_destination = format!("{}/api/scan-simple", target_destination);

        let mut map = std::collections::HashMap::new();
        map.insert("websiteUrl", url);
        
        let client = reqwest::Client::new();
        let res = client.post(request_destination)
            .json(&map)
            .send()
            .await?;

        let body: ApiResult = res.json().await?;

        Ok(body)
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