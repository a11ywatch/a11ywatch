# a11ywatch-clients

Clients to use to interact with the API.
You can also use the [protobuf](./src/schema) files to generate your clients to make gRPC request or run `npm i @a11ywatch/protos`.
This repo is only used to handle the code to generate the clients.

## Clients

You can view all of the clients source code [here on GitLab](https://gitlab.com/j-mendez/a11ywatch-clients).

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

## Getting Started

To get started generating the clients run the commands:

```sh
npm install @openapitools/openapi-generator-cli -g
cargo run # generates the clients
```

## gRPC

The gRC calls only work on self-hosted or enterprise accounts. None of the ports are exposed to the public for the gRPC API unless you are a partner.

### Steps

1. ~~Generate OpenAPI clients~~.
2. ~~Configure auto generated between main clients~~.
3. ~~Setup CI image to perform generation~~.
4. Add Release based on tag version.
