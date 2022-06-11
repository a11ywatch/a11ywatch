/// a11ywatch client lib
mod a11ywatch_clients {
    include!("src/api_client_generator/lib.rs");
}

fn main() {
    // Tell cargo to invalidate the built crate whenever the wrapper changes
    println!("cargo:rerun-if-changed=schema.json");
    a11ywatch_clients::build_javascript();
    a11ywatch_clients::build_go();
    a11ywatch_clients::build_rust();
}