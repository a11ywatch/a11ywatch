use crate::fs::temp::TempFs;
use crate::rpc::{crawl, scan};
use crate::utils::Website;

use crate::rpc::client::apicore::Page;
use serde::{Deserialize, Serialize};

use std::env;
use std::time::Instant;

pub static APP_USER_AGENT: &str = concat!(env!("CARGO_PKG_NAME"), "/", env!("CARGO_PKG_VERSION"),);

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
    pub data: Option<Vec<Page>>,
    pub success: bool,
    pub message: String,
    pub code: i32,
}

#[derive(Debug, Default)]
pub(crate) struct ApiClient {}

impl ApiClient {
    /// Single page scan
    #[tokio::main]
    pub async fn scan_website(url: &str, file_manager: &TempFs) -> Result<ApiResult, ()> {
        let token = file_manager.get_token();
        let mut resp: ApiResult = ApiResult::default();

        let start = Instant::now();
        let data = scan(url.to_string(), token).await;
        let duration = start.elapsed();

        resp.data = Some(data);
        resp.success = true;
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
    ) -> Result<CrawlApiResult, ()> {
        let token = file_manager.get_token();
        let mut results: CrawlApiResult = CrawlApiResult::default();

        let start = Instant::now();

        let resp = crawl(url.to_string(), token, *subdomains, *tld, *norobo, *sitemap).await;

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
