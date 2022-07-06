<div align="center">
  <h1>A11yWatch</h1>
  <p>
    <strong>A11yWatch is a powerful web accessibility toolkit made using Rust and Nodejs</strong>
  </p>
  <p>

[![crates.io](https://img.shields.io/crates/v/a11ywatch_cli?label=latest)](https://docs.rs/crate/a11ywatch_cli/latest)
![MIT](https://img.shields.io/crates/l/a11ywatch_cli.svg)
[![A11yWatchBot](https://github.com/A11yWatch/a11ywatch/actions/workflows/build-test.yml/badge.svg)](https://github.com/A11yWatch/a11ywatch/actions/workflows/build-test.yml)

  </p>
</div>

## Getting Started

The [CLI](./cli/README.md) can be used to test and build your own instance anywhere.<br>
We have [clients](./clients) in multiple languages and protocols to integrate with your app easier.<br>
See the [documentation](https://docs.a11ywatch.com) for more information.

The web application starts on port 80 when running `docker-compose up` or [Kubernetes](./kubernetes/) and view the exposed core API at `3280`.

```sh
docker-compose up # view http://localhost:3280 or http://localhost:3280/graphql
WEB_PORT=3000 docker-compose up # start front-end on different port
```

You can also use the experimental [docker image](https://hub.docker.com/r/a11ywatch/a11ywatch) with all of the services combined into one container.

```yml
version: "3.9"
services:
  a11ywatch:
    image: a11ywatch/a11ywatch
```

## Contributing

Read the [contributing guide](/CONTRIBUTING.md) to learn about our development process, how to propose bug fixes and improvements, how to build and test your changes to A11yWatch.

Notice that contributions go far beyond pull requests and commits.
Although we love giving you the opportunity to put your stamp on A11yWatch, we also are thrilled to receive a variety of [other contributions](https://a11ywatch.com/faq).

## Support

If you need support, start with the [troubleshooting guide](https://docs.a11ywatch.com/documentation/troubleshooting),
if you still need help please contact us [contact](https://docs.a11ywatch.com/documentation/contact).

## LICENSE

check the license file in the root of the project.
