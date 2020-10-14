/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

use rocket;
use rocket_contrib;
// #[macro_use] extern crate dotenv_codegen;
use dotenv;
use reqwest;
use serde_json;
use spider;

use rocket_contrib::json::Json;
use spider::website::Website;
use std::collections::HashMap;

#[derive(Debug, Serialize, Deserialize)]
pub struct WebPage {
	url: String,
	id: u32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Page {
	pages: Vec<String>,
	user_id: u32,
	domain: String,
}

#[tokio::main]
pub async fn post_website(serialized: String) {
	let crawl_api_url = dotenv::var("CRAWL_URL").unwrap();
	let page_url = crawl_api_url.to_string();
	let mut map = HashMap::new();

	map.insert("data", serialized);

	reqwest::Client::new()
		.post(&page_url)
		.form(&map)
		.send()
		.await
		.unwrap();
}

#[post("/crawl", format = "json", data = "<user>")]
pub fn crawl_page(user: Json<WebPage>) -> String {
	// UNCOMMENT IF CAPABLE OF USING ENV VAR PRE+Build
	// if cfg!(debug_assertions) && crawl_api_url.is_empty() {
	//     crawl_api_url = dotenv!("CRAWL_URL").to_string();
	// }
	let domain = String::from(&user.url);
	let mut website: Website = Website::new(&domain);
	let mut vector: Vec<String> = Vec::new();

	website.configuration.respect_robots_txt = true;
	website.configuration.verbose = true;
	website.crawl();

	for page in website.get_pages() {
		vector.push(page.get_url().to_string());
	}

	let page = Page {
		pages: vector,
		user_id: user.id,
		domain: domain,
	};
	let serialized = serde_json::to_string(&page).unwrap();

	post_website(serialized);

	format!("Watcher, crawled!")
}
