use crate::fs::temp::TempFs;
use crate::utils::Website;
use crate::rpc::{scan, crawl};

use serde::{Deserialize, Serialize};

use std::env;
use std::time::Instant;
use ureq::{Error};

pub static APP_USER_AGENT: &str = concat!(
    env!("CARGO_PKG_NAME"),
    "/",
    env!("CARGO_PKG_VERSION"),
);

#[derive(Deserialize, Serialize, Debug, Default)]
pub struct ApiResult {
    pub data: Option<Website>,
    pub success: bool,
    pub message: String,
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
    #[tokio::main(flavor = "current_thread")]
    pub async fn scan_website(url: &str, file_manager: &TempFs) -> Result<ApiResult, Error> {
        let token = file_manager.get_token();
        let mut resp: ApiResult = ApiResult::default();

        let data = scan(url.to_string(), token).await;
        
        resp.data = Some(data);
        
        Ok(resp)
    }
    /// Site wide scan [Stream]
    #[tokio::main(flavor = "current_thread")]
    pub async fn crawl_website(
        url: &str,
        subdomains: &bool,
        tld: &bool,
        file_manager: &TempFs,
    ) -> Result<CrawlApiResult, Error> {
        let start = Instant::now();

        let token = file_manager.get_token();
        let mut results: CrawlApiResult = CrawlApiResult::default();

        let resp = crawl(url.to_string(), token, *subdomains, *tld).await;
        
        let duration = start.elapsed();

        let res_len = resp.len();
        let mut res_end = "s";
        if res_len == 1 {
            res_end = "";
        }
                
        results.data = Some(resp);
        results.message = format!("Crawled {} page{} in {:?}", res_len, res_end, duration);
        results.success = true;

        Ok(results)
    }
}

#[cfg(test)]
#[cfg(feature = "grpc")]
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
