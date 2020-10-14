/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
extern crate rocket_contrib;
// #[macro_use] extern crate dotenv_codegen;
extern crate reqwest;
extern crate spider;

#[macro_use]
extern crate serde_derive;
extern crate dotenv;
extern crate serde_json;

mod routes;

pub fn rocket() -> rocket::Rocket {
	rocket::ignite().mount(
		"/",
		routes![routes::index::landing, routes::crawl::crawl_page],
	)
}
