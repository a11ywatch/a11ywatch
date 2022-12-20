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


## Installing

The [CLI](./cli/README.md) can be used to test and build your own instance anywhere.<br>
We have [clients](./clients) in multiple languages and protocols to integrate with your app easier.<br>
See the [documentation](https://docs.a11ywatch.com) for more information on getting started with development and etc.

If you want to integrate your system with A11yWatch the simplest way is to use the javascript [sidecar](https://github.com/a11ywatch/sidecar).

Example of a multi page crawl example with valid a11ywatch instance up ex: (`a11ywatch start`):

https://user-images.githubusercontent.com/8095978/200062932-22fd962e-1e9a-4b56-9200-f19bdc5e6da8.mp4

## Getting Started

The [A11yWatch CLI](./cli/README.md) provides entry points into the system using `a11ywatch start` command.

Run `a11ywatch start -s` command for the slim standalone build.
In order to use the A11yWatch website UI pass the `-f` option ex:  `a11ywatch start -f`.

We provide the [standlone docker image](https://hub.docker.com/r/a11ywatch/a11ywatch) with the services in one image except the web application starting default on port `3280`, you can skip this step if you ran `a11ywatch start`.

The following shows starting up the standalone image with [docker compose](https://docs.docker.com/compose/).

```yml
version: "3.9"
services:
  a11ywatch:
    image: a11ywatch/a11ywatch
    ports:
      - 3280:3280
```

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

### JS

You can use the pure [javascript client](https://gitlab.com/j-mendez/a11ywatch-clients/-/tree/main/javascript_api_client) following:

First `npm i a11ywatch_client --save`

```ts
import A11ywatchClient from 'a11ywatch_client'

const defaultClient = A11ywatchClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
const bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

const api = new A11ywatchClient.ReportsApi()
const opts = {
  'url': "https://a11ywatch.com", // {String} The page url
  'subdomains': false, // {Boolean} Enable subdomains detection
  'tld': false, // {Boolean} Enable TLD detection
  'robots': false // {Boolean} Respect robots.txt file
};

const callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};

api.crawlWebsite(opts, callback);

```

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
