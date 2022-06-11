# a11ywatch-clients

Clients to use to interact with the API.
You can also use the [protobuf](./src/schema/README.md) files to generate your clients to make gRPC calls to the server for your website.

[CLI](../cli)

[Javascript - WIP](./src/api_client_generator/javascript/README.md)

[Go - WIP](./src/api_client_generator/go/README.md)

[Rust - WIP](./src/api_client_generator/rust/README.md)

# WIP

All clients are a work in progress. The only available client at the moment is the [CLI](../cli). The [schema.json](./schema.json) defines the routes and params for the request.
Rust is used to generate the langauge templates. The gRPC calls only work on self hosted systems and enterprise accounts. In order to run the client gen run `cargo run --bin force-build`.
