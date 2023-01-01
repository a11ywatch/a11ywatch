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

## Getting Started

### A11yWatch CLI

[A11yWatch CLI](./cli/README.md) is the fastest way to get started with A11yWatch. It brings the tools to manage infrastructure, powerful commands for interactivity, and provides the ability to automate workflows using tools like Github Actions and more.

Example of a multi page crawl with valid instance up using `a11ywatch_cli v0.8.23`:

https://user-images.githubusercontent.com/8095978/200062932-22fd962e-1e9a-4b56-9200-f19bdc5e6da8.mp4

For a step by step [view the docs](https://docs.a11ywatch.com/documentation/cli/).

### Docker

You can also get started using the [standlone docker image](https://hub.docker.com/r/a11ywatch/a11ywatch) locally or self host it.

With a valid docker installation up in a new folder run the following command (replace `latest` with `darwin` on macOS or use the `IMAGE` env var):

```sh
# create the bridge network for front-end and backend
docker network create --driver bridge a11ywatch-net
# start the backend
docker run -p 3280:3280 -v ${PWD}:/a11ywatch/conf \
  --network a11ywatch-net \
  --name a11ywatch-backend \
  -e SUPER_MODE=true \
  a11ywatch/a11ywatch:${IMAGE:-latest}
# start the frontend
docker run -p 3000:3000 -v ${PWD}:/a11ywatch/conf \
  --network a11ywatch-net \
  --name a11ywatch-frontend \
  -e SUPER_MODE=true \
  a11ywatch/web
```

Afterwards open http://localhost:3000 in your browser to continue.

Example of the dashboard crawling multi websites with live updates:

https://user-images.githubusercontent.com/8095978/209417141-c287dbab-5b00-4d2b-b19a-dad013403718.mp4

For step by step instructions, [view the docs](https://docs.a11ywatch.com/documentation/self-hosting-start/).

## Development

View the [contributing docs](https://docs.a11ywatch.com/documentation/self-hosting-start/#docker) to get started.

## [Benchmarks](./benchmarks)

### Local (no latency)

Case: `https://a11ywatch.com` multi site scan.
10x simultaneous runs each ran via localhost to avoid latency.

|                                                            | `libraries`       |
| :--------------------------------------------------------- | :---------------- |
| **`Rust[A11yWatch]: crawl 10 times against 28 urls`**      | `20 ms`           |
| **`Nodejs[Pa11y-Wave]: crawl 10 times against 25 urls`**   | `63 s`            |
| **`Nodejs[Axe-Deque]: crawl 10 times against 25 urls`**    | `113 s`           |

### External (latency)

Benchmarks using the [CLI](./cli/) and [hyperfine](https://github.com/sharkdp/hyperfine) with network latency non localhost.

Single page scan:

```
hyperfine 'a11ywatch scan -u https://a11ywatch.com' 

Benchmark 1: a11ywatch scan -u https://a11ywatch.com
  Time (mean ± σ):     336.0 ms ±  27.0 ms    [User: 2.3 ms, System: 2.7 ms]
  Range (min … max):   281.3 ms … 365.8 ms    10 runs
```

Multi page scan (26 pages):

```
hyperfine 'a11ywatch crawl -u https://a11ywatch.com' 

Benchmark 1: a11ywatch crawl -u https://a11ywatch.com
  Time (mean ± σ):      1.765 s ±  0.048 s    [User: 0.005 s, System: 0.004 s]
  Range (min … max):    1.729 s …  1.879 s    10 runs
```

A11yWatch helps builds confidence due to handling dynamic parameters and amount of coverage from reports.
It can handle up to 150k pages easily under 1 min with 8gb of memory on linux.

## Contributing

Read the [contributing guide](./CONTRIBUTING.md) to learn about the development process, how to propose bug fixes and improvements, how to build and test your changes to A11yWatch.

## Support

If you need support, start with the [troubleshooting guide](https://docs.a11ywatch.com/documentation/troubleshooting),
if you still need help please contact us [contact](https://docs.a11ywatch.com/documentation/contact).

## LICENSE

Check the license file in the root of the project.
