# A11ywatchClient

The web accessibility API built for scale.  For this sample, you can use the api key \&quot;special-key\&quot; to test the authorization filters

### Building

To install the required dependencies and to build the elixir project, run:
```
mix local.hex --force
mix do deps.get, compile
```

## Installation

If [available in Hex](https://hex.pm/docs/publish), the package can be installed
by adding `a11ywatch_client` to your list of dependencies in `mix.exs`:

```elixir
def deps do
  [{:a11ywatch_client, "~> 0.1.0"}]
end
```

Documentation can be generated with [ExDoc](https://github.com/elixir-lang/ex_doc)
and published on [HexDocs](https://hexdocs.pm). Once published, the docs can
be found at [https://hexdocs.pm/a11ywatch_client](https://hexdocs.pm/a11ywatch_client).


## Configuration

You can override the URL of your server (e.g. if you have a separate development and production server in your configuration files.
```elixir
config :a11ywatch_client, base_url: "https://api.a11ywatch.com/api"
```