/// Generate the client
pub mod api_client_generator;

pub(crate) use self::api_client_generator::{ generate_clients };

fn main() {
    println!("cargo:rerun-if-changed=./src/schema/rest.json");
    generate_clients();
}