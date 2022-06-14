# a11ywatch-clients

Clients to use to interact with the API.
You can also use the [protobuf](./src/schema) files to generate your clients to make gRPC request.
The clients with shell code at the bottom are published and can be installed with the commands easier.

## Clients

You can view all of the clients source code [here](https://gitlab.com/j-mendez/a11ywatch-clients) on GitLab to build from.

- [C](https://gitlab.com/j-mendez/a11ywatch-clients/-/tree/main/c_api_client)

- [CLI](../cli)

- [C++](https://gitlab.com/j-mendez/a11ywatch-clients/-/tree/main/cpp-restsdk_api_client)

- [C#](https://gitlab.com/j-mendez/a11ywatch-clients/-/tree/main/csharp_api_client)

- [C#-NetCore](https://gitlab.com/j-mendez/a11ywatch-clients/-/tree/main/csharp-netcore_api_client)

- [Elixir](https://gitlab.com/j-mendez/a11ywatch-clients/-/tree/main/elixir_api_client)

- [Go](https://gitlab.com/j-mendez/a11ywatch-clients/-/tree/main/go_api_client)

- [Java](https://gitlab.com/j-mendez/a11ywatch-clients/-/tree/main/java_api_client)

- [Javascript](https://gitlab.com/j-mendez/a11ywatch-clients/-/tree/main/javascript_api_client)

- [Lua](https://gitlab.com/j-mendez/a11ywatch-clients/-/tree/main/lua_api_client)

- [Rust](https://gitlab.com/j-mendez/a11ywatch-clients/-/tree/main/rust_api_client)

- [Ruby](https://gitlab.com/j-mendez/a11ywatch-clients/-/tree/main/ruby_api_client)

- [Swift](https://gitlab.com/j-mendez/a11ywatch-clients/-/tree/main/swift5_api_client)

- [Typescript](https://gitlab.com/j-mendez/a11ywatch-clients/-/tree/main/typescript_api_client)

- [Obj-C](https://gitlab.com/j-mendez/a11ywatch-clients/-/tree/main/objc_api_client)

- [PHP](https://gitlab.com/j-mendez/a11ywatch-clients/-/tree/main/php_api_client)

- [Python](https://gitlab.com/j-mendez/a11ywatch-clients/-/tree/main/python_api_client)

## OpenAPI

To get started with the OpenAPI generator follow the [instructions](https://github.com/OpenAPITools/openapi-generator#openapi-generator) in the github repo.

All clients are a work in progress, the most complete client is the [CLI](../cli).
In order to run the client gen run `cargo run` and navigate into the language of choice to utilize the client.
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
