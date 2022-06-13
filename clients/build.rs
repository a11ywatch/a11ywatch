/// a11ywatch client lib
mod a11ywatch_clients {
    include!("src/api_client_generator/lib.rs");
}

fn main() {
    println!("cargo:rerun-if-changed=./src/schema/rest.json");
    a11ywatch_clients::generate_clients();
}