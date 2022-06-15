/// Generate the client
pub mod api_client_generator;

fn main() {
    println!("cargo:rerun-if-changed=./src/schema/rest.json");
    api_client_generator::generate_clients();
}