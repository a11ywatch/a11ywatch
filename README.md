<div align="center">
  <h1>A11yWatch</h1>
  <p>
    <strong>A11yWatch is a powerful web accessibility toolkit made using Rust and Nodejs</strong>
  </p>
  <p>

[![crates.io](https://img.shields.io/crates/v/a11ywatch_cli?label=latest)](https://docs.rs/crate/a11ywatch_cli/latest)
![MIT](https://img.shields.io/crates/l/a11ywatch_cli.svg)
[![A11yWatchBot](https://github.com/A11yWatch/a11ywatch/actions/workflows/build-test.yml/badge.svg)](https://github.com/A11yWatch/a11ywatch/actions/workflows/build-test.yml)
![downloads](https://img.shields.io/crates/d/a11ywatch_cli.svg)

  </p>
</div>

## Getting Started

The web application starts on port 80 when running `docker-compose up` and the API entry port is `3280`.

```sh
docker-compose up # view http://localhost:3280 or http://localhost:3280/graphql
WEB_PORT=3000 docker-compose up # start front-end on different port
```

The [CLI](./cli/README.md) can be used to test and build your own A11yWatch instance anywhere.<br>
We have [Clients](./clients) in multiple languages and protocols to integrate with your app easier.<br>
See the [documentation](https://docs.a11ywatch.com) for more information.

## Contributing

Read the [contributing guide](/CONTRIBUTING.md) to learn about our development process, how to propose bug fixes and improvements, how to build and test your changes to A11yWatch.

Notice that contributions go far beyond pull requests and commits.
Although we love giving you the opportunity to put your stamp on A11yWatch, we also are thrilled to receive a variety of [other contributions](https://a11ywatch.com/faq).

## Backers

Support us with a monthly donation and help us continue our activities. [[Become a backer](https://opencollective.com/a11ywatch#backer)]

## Support

If you need support, start with the [troubleshooting guide](https://docs.a11ywatch.com/documentation/troubleshooting),
if you still need help please contact us [contact](https://docs.a11ywatch.com/documentation/contact).

## LICENSE

check the license file in the root of the project.
