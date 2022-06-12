# a11ywatch-clients

Clients to use to interact with the API.
You can also use the [protobuf](./src/schema) files to generate your clients to make gRPC calls to the server for your website.

[CLI](../cli)

[Javascript - WIP](./src/api_client_generator/javascript)

[Go - WIP](./src/api_client_generator/go)

[Rust - WIP](./src/api_client_generator/rust)

## WIP

All clients are a work in progress, the most complete client is the CLI. The only available client at the moment is the [CLI](../cli).
The [schema](./src/schema/rest.json) defines the routes and params for the request.
Rust is used to generate the langauge templates. The gRPC calls only work on self hosted systems and enterprise accounts. In order to run the client gen run `cargo run --bin force-build`.
The current examples are going to switch to [OpenAPI](https://github.com/OpenAPITools/openapi-generator) for generating the clients.

## OpenAPI

To get started with the OpenAPI generator follow the [instructions](https://github.com/OpenAPITools/openapi-generator#openapi-generator) in the github repo.

## Goals

1. Use OpenAPI to generate any client for the A11yWatch API.
2. Add gRPC capable client generation.

### Steps

1. Generate OpenAPI clients.
2. Configure auto generated between main clients.
3. Setup docker machine image to perform generation.
4. Move setup onto Github Action.
5. Add Manual Action Release based on Schema file changes PR.
6. Move manual schema route handling to auto generated file. (Create API that uses routes as enums to handle route for full endpoint list with descriptions etc..)
