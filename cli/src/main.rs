pub mod args;

use args::parse_args;

fn main() {
    let options = parse_args(std::env::args());

    // build on target os
    if options.contains_key("build") {
        println!("build: creating the application running");
    }

    // launch deploy via terraform
    if options.contains_key("deploy") {
        println!("deploy: deploying infrastructure running");
    }

    // start application
    if options.contains_key("run") {
        println!("run: starting application running");
    }

}