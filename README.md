<div align="center">
  <h1>A11yWatch</h1>
  <p>
    <strong>A11yWatch is a open source web accessibility platform for staying inclusive</strong>
  </p>
  <p>

[![crates.io](https://img.shields.io/crates/v/a11ywatch_cli?label=latest)](https://docs.rs/crate/a11ywatch_cli/latest)
![MIT](https://img.shields.io/crates/l/a11ywatch_cli.svg)

  </p>
</div>


## Pre-requisites

* [Rust](https://www.rust-lang.org/tools/install) is required if building locally.
* [Nodejs](https://nodejs.org/en/download/) is required if building locally.
* [Docker](https://docs.docker.com/get-docker/) is required if you are not building locally.

## Installing

The [CLI](./cli/README.md) can be used to test and build your own instance anywhere.<br>
We have [clients](./clients) in multiple languages and protocols to integrate with your app easier.<br>
See the [documentation](https://docs.a11ywatch.com) for more information on getting started with development and etc.

If you want to integrate your system with A11yWatch the simplest way is to use the javascript [sidecar](https://github.com/a11ywatch/sidecar).

Example of a multi page crawl example with valid instance up using `a11ywatch_cli 0.8.23`:

https://user-images.githubusercontent.com/8095978/200062932-22fd962e-1e9a-4b56-9200-f19bdc5e6da8.mp4

## Getting Started

The [A11yWatch CLI](./cli/README.md) provides entry points into the system using `a11ywatch start` command.

Example using the CLI to run some reports below:

```sh
# install via cargo
cargo install a11ywatch_cli
# install via npm
npm i a11ywatch-cli -g
```

First run the `a11ywatch build` to setup the project configuration.

Start the backend and front-end with `a11ywatch start -f` or using `a11ywatch start -f -l` for local installs (non docker).

Perform a multi page website crawl with  `a11ywatch crawl` ex: `a11ywatch crawl --url https://a11ywatch.com -s -d`.

Get the last run pass fail in a report after to show pass/fail status `a11ywatch --results-parsed-list`.

To bring down the instance run `a11ywatch stop` command can shutdown the instance(s) completely. 

The `start` and `build` command share some of the same flags to setup the config required before runtime init. You can switch context or targets at any time
using the `start` command since the build command is set to prep the instance and some outside configurations before the application starts.

All of the commands and flags you can add the `--help` to get details on what is available.

## Common Commands and Usage

Here are some common commands for communicating with the platform after you have a valid instance up.

### CLI Commands

Single page scan and store results.

`a11ywatch scan --url https://a11ywatch.com -s`

Multi page scan and store results.

`a11ywatch crawl --url https://a11ywatch.com -s -d`

Apply Code generation fixes using the `--fix` flag.

`a11ywatch crawl --url https://a11ywatch.com -s -d --fix`

### HTTP

Single page scan.

```
curl --location --request POST 'http://localhost:3280/api/scan-simple' \
--header 'Content-Type: application/json' \
--data-raw '{
    "url": "https://a11ywatch.com"
}'
```

Multi page scan.

```
curl --location --request POST 'http://localhost:3280/api/crawl' \
--header 'Content-Type: application/json' \
--data-raw '{
    "url": "https://a11ywatch.com",
    "subdomains": false,
    "tld": false,
    "robots": false
}'
```

Multi page scan streamed.

```
curl --location --request POST 'http://localhost:3280/api/crawl' \
--header 'Transfer-Encoding: chunked' \
--header 'Content-Type: application/json' \
--data-raw '{
    "url": "https://a11ywatch.com",
    "subdomains": false,
    "tld": false,
    "robots": false
}'
```

### Docker

We provide the [standlone docker image](https://hub.docker.com/r/a11ywatch/a11ywatch) with the services in one image except the web application starting default on port `3280`, you can skip this step if you are using the CLI.

## Development

View the [contributing docs](https://docs.a11ywatch.com/documentation/contributing/) to get started.

## [Benchmarks](./benchmarks)

Case: `https://a11ywatch.com` multi site scan.
10x simultaneous runs each ran via localhost to avoid latency.

|                                                            | `libraries`       |
| :--------------------------------------------------------- | :---------------- |
| **`Rust[A11yWatch]: crawl 10 times against 28 urls`**      | `20 ms`           |
| **`Nodejs[Pa11y-Wave]: crawl 10 times against 25 urls`**   | `63 s`            |
| **`Nodejs[Axe-Deque]: crawl 10 times against 25 urls`**    | `113 s`           |

A11yWatch helps builds confidence due to handling dynamic parameters and amount of coverage from reports.
It can handle up to 150k pages easily under 1 min with 8gb of memory on linux.

## Contributing

Read the [contributing guide](./CONTRIBUTING.md) to learn about the development process, how to propose bug fixes and improvements, how to build and test your changes to A11yWatch.

## Support

If you need support, start with the [troubleshooting guide](https://docs.a11ywatch.com/documentation/troubleshooting),
if you still need help please contact us [contact](https://docs.a11ywatch.com/documentation/contact).

## LICENSE

Check the license file in the root of the project.
