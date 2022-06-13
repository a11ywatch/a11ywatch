# a11ywatch-clients

Clients to use to interact with the API.
You can also use the [protobuf](./src/schema) files to generate your clients to make gRPC request.
The clients with shell code at the bottom are published and can be installed with the commands easier.

## Clients

- [CLI](../cli)

  ```shell
  cargo install a11ywatch_cli
  ```

- [C#](./libs/csharp_api_client)

- [C#-NetCore](./libs/csharp-netcore_api_client)

- [Elixir](./libs/elixir_api_client)

- [Go](./libs/go_api_client)

- [Java](./libs/java_api_client)

- [Javascript](./libs/javascript_api_client)

  ```shell
  npm install a11ywatch_client --save
  ```

- [Lua](./libs/lua_api_client)

- [Rust](./libs/rust_api_client)

- [Ruby](./libs/ruby_api_client)

- [Swift](./libs/swift5_api_client)

- [Typescript](./libs/typescript_api_client)

- [PHP](./libs/php_api_client)

- [Python](./libs/python_api_client)

## OpenAPI

To get started with the OpenAPI generator follow the [instructions](https://github.com/OpenAPITools/openapi-generator#openapi-generator) in the github repo.

All clients are a work in progress, the most complete client is the [CLI](../cli).
In order to run the client gen run `cargo run --bin force-build` and navigate into the language of choice to utilize the client.
The clients generated will not be pushed up into this repo except the markdown files for instructions and will only be available by either cloning the repo or installing the dependency.

## gRPC

The gRC calls only work on self-hosted or enterprise accounts. None of the ports are exposed to the public for the gRPC API unless you are a partner.

### Steps

1. ~~Generate OpenAPI clients~~.
2. ~~Configure auto generated between main clients~~.
3. Setup docker machine image to perform generation.
4. Move setup onto Github Action.
5. Add Manual Action Release based on Schema file changes PR.
6. Move manual schema route handling to auto generated file. (Create API that uses routes as enums to handle route for full endpoint list with descriptions etc..)
