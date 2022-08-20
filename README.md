<div align="center">
  <h1>A11yWatch</h1>
  <p>
    <strong>A11yWatch is a powerful web accessibility toolkit made using Rust and JavaScript</strong>
  </p>
  <p>

[![crates.io](https://img.shields.io/crates/v/a11ywatch_cli?label=latest)](https://docs.rs/crate/a11ywatch_cli/latest)
![MIT](https://img.shields.io/crates/l/a11ywatch_cli.svg)

  </p>
</div>

## Getting Started

The [CLI](./cli/README.md) can be used to test and build your own instance anywhere.<br>
We have [clients](./clients) in multiple languages and protocols to integrate with your app easier.<br>
See the [documentation](https://docs.a11ywatch.com) for more information on getting started with development and etc.

The web application starts on port 80 when running `docker-compose up` or [Kubernetes](./kubernetes/) and view the exposed core API at `3280`.

```sh
docker-compose --file ./docker/docker-compose.yml up # view http://localhost:3280 or http://localhost:3280/graphql
WEB_PORT=3000 docker-compose --file ./docker/docker-compose.yml up # start front-end on different port
```

You can also use the [docker image](https://hub.docker.com/r/a11ywatch/a11ywatch) with all of the services in one container except the web application.

```yml
version: "3.9"
services:
  a11ywatch:
    image: a11ywatch/a11ywatch
    ports:
      - 3280:3280
```

If you want to integrate your system with A11yWatch the simplest way is to use the javascript [sidecar](https://github.com/a11ywatch/sidecar).

## [Benchmarks](./benchmarks)

Case: `https://a11ywatch.com` multi site scan.
10x simultaneous runs each ran via localhost to avoid latency.

|                                                            | `libraries`            |
| :--------------------------------------------------------- | :--------------------- |
| **`Rust[a11ywatch]: with crawl 10 times against 28 urls`** | `1.1 s` (✅ **1.00x**) |
| **`Nodejs[Pa11y]: with crawl 10 times against 25 urls`**   | `63 s` (✅ **1.00x**)  |
| **`Nodejs[Axe]: with crawl 10 times against 25 urls`**     | `113 s` (✅ **1.00x**) |

A11yWatch handles 3 more urls since it can handle dynamic parameters for pages.
It is important to handle parameters since the output of the page can change.
A11yWatch shines brighter if the website is larger. It can handle running over 10k pages easily under 5 mins with 8gb of memory on linux.

## Contributing

Read the [contributing guide](./CONTRIBUTING.md) to learn about our development process, how to propose bug fixes and improvements, how to build and test your changes to A11yWatch.

## Support

If you need support, start with the [troubleshooting guide](https://docs.a11ywatch.com/documentation/troubleshooting),
if you still need help please contact us [contact](https://docs.a11ywatch.com/documentation/contact).

## LICENSE

check the license file in the root of the project.
