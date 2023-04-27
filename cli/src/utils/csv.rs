/// convert API scans results to csv
pub fn process_csv(api_result: &crate::commands::api::rest::ApiResult) -> Vec<u8> {
    let mut wtr = csv::Writer::from_writer(vec![]);

    wtr.write_record(&[
        "Url", "Total", // "Domain",
        // "Online",
        // "IssuesInfo",
        "TTL", "Date", "Issues",
    ])
    .unwrap();

    // todo: unwrap and set default website
    let results = api_result.data.as_ref().unwrap();

    match wtr.serialize((
        &results.url,
        // &results.domain,
        // &results.online,
        &results.issues_info.as_ref().unwrap().total_issues,
        &results.page_load_time.as_ref().unwrap().duration,
        &results.last_scan_date,
        &serde_json::to_string(&results.issues).unwrap_or_default(),
    )) {
        _ => (),
    };

    match wtr.flush() {
        _ => (),
    };

    wtr.into_inner().unwrap_or_default()
}

/// convert crawl API scans results to csv
pub fn process_crawl_csv(api_result: &crate::commands::api::rest::CrawlApiResult) -> Vec<u8> {
    let mut wtr = csv::Writer::from_writer(vec![]);

    wtr.write_record(&[
        "Url", "Total", // "Domain",
        // "Online",
        // "IssuesInfo",
        "TTL", "Date", "Issues",
    ])
    .unwrap();

    // todo: unwrap and set default website
    let results = api_result.data.as_ref().unwrap();

    for results in results.iter() {
        match wtr.serialize((
            &results.url,
            // &results.domain,
            // &results.online,
            &results.issues_info.as_ref().unwrap().total_issues,
            &results.page_load_time.as_ref().unwrap().duration,
            &results.last_scan_date,
            &serde_json::to_string(&results.issues).unwrap_or_default(),
        )) {
            _ => (),
        };
    }

    match wtr.flush() {
        _ => (),
    };

    wtr.into_inner().unwrap_or_default()
}
