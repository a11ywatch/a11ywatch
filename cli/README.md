# a11ywatch-cli

The A11yWatch Command Line Interface. View the [cli-docs](https://docs.a11ywatch.com/documentation/cli/) for more complete info.

## Installation

1. `cargo install a11ywatch_cli`

Optional:

If you are using Lite mode you can add the feature flag `grpc` to compile protoc and tonic.

[Protoc](https://grpc.io/docs/protoc-installation/) is required to compile. Vendoring OpenSSL is available by using the feature flag `dist-vendor` upon install ex: `cargo install --path . --features dist-vendor`. The flag is also available following [RTN Consuming](https://github.com/a11ywatch/rust-to-npm) for node installs via npm.

### Linux

If you are on Ubuntu OpenSSL is required. 
You may need to add the command `sudo` before `apt-get`.

```sh
apt-get update && apt upgrade -y && apt-get install -y --no-install-recommends build-essential gcc cmake libc6 libssl-dev pkg-config
```

### Windows

[Cmake](https://cmake.org/) is required on windows.

## Build

Get the CLI by running one of the commands below.

```sh
# install via cargo
cargo install a11ywatch_cli
# or install via npm
npm i a11ywatch-cli -g
```

Build init:

```sh
# build the instance first, this allows configuring architecture specifics like apple m1 chips.
a11ywatch build
```

Startup:

Use one of the following commands to start the instance. If you need the front-end client passing the -f option [min of 1.25gb of memory required alloc to docker resource].


```sh
# start the instance requires docker running.
a11ywatch start
```

```sh
# Start the instance with the front-end on port 3270 by default requires docker running..
a11ywatch start -f
```

```sh
# You can also start the system local via `nodejs` monolith.
a11ywatch start --local
```

```sh
# Use the `--standalone` flag to use the monolith in docker.
a11ywatch start --standalone
```

```sh
# If you need to upgrade the instance to new images run with the upgrade flag - can also be used with the build command.
a11ywatch start --upgrade
```

Actions:

```sh
# scan a url and pipe the stdout to a file.
a11ywatch scan --url https://a11ywatch.com > results.json
# scan a url and attempt to fix code based on recommendations [installs the fast ripgrep crate for search].
a11ywatch scan --url https://a11ywatch.com --fix
# scan and store results as csv to disk.
a11ywatch scan --save --csv --url https://a11ywatch.com
# scan a website multi page and pipe the stdout to a file.
a11ywatch crawl --url https://a11ywatch.com > results.json
# scan a website multi page and include subdomains.
a11ywatch crawl --url https://a11ywatch.com -S > results.json
# scan a website multi page and include subdomains and all TLD extensions.
a11ywatch crawl --url https://a11ywatch.com -S -t > results.json
# scan a website multi page and get results parsed as checklist.
a11ywatch crawl --url https://a11ywatch.com -d -n -s && a11ywatch --results-parsed-list
# crawl and store results as csv to disk.
a11ywatch crawl --save --csv --url https://a11ywatch.com
```

If you experience issues the `cargo install a11ywatch_cli` command, try running `rustup update stable` to make sure your cargo version is up to date.

## ENV

Here are env vars that you can configure to enhance the system abilities.
You can get your [Computer Vision](https://azure.microsoft.com/en-us/services/cognitive-services/computer-vision/) API key here.
Grab your [PageSpeed](https://developers.google.com/speed/docs/insights/v5/get-started#APIKey) API key to speed up lighthouse parallel runs.

Example of a `.env` file below:

```
COMPUTER_VISION_SUBSCRIPTION_KEY="REPLACE_WITH_KEY"
COMPUTER_VISION_ENDPOINT="REPLACE_WITH_ENDPOINT"
PAGESPEED_API_KEY="REPLACE_WITH_PAGESPEED_API_KEY"
# set to a directory or true in order to enable recordings in litemode
PAGEMIND_RECORD=
```

You can also use the CLI to configure settings like Computer Vision creditials, Recording Video, and more.

```sh
# replace $mycv_token and $myvcvname with your project name and ComputerVision API url
a11ywatch --set-cv-token $mycv_token
a11ywatch --set-cv-url https://$myvcvname.cognitiveservices.azure.com/
a11ywatch --set-recording ./recordings
```

Example options and commands `a11ywatch -h`:

```sh
a11ywatch_cli 0.10.7
j-mendez <jeff@a11ywatch.com>
A11yWatch web accessibility CLI.

USAGE:
    a11ywatch [OPTIONS] [SUBCOMMAND]

OPTIONS:
    -c, --clear-token
            Clear the API token to use for requests

        --clear-cv-token
            Clear the Computer Vision API token to use for request

        --clear-recording
            Clear the recording preventing storing video

    -f, --find-results
            Log file results path

        --find-tmp-dir
            Get the apps tmp directory location

    -g, --github-api-url
            Get github API endpoint of project

        --github-results-path
            Log file results github path

    -h, --help
            Print help information

    -r, --results-parsed-list
            Get results file parsed as report list of passed / failed

    -R, --results-parsed
            Get results file parsed to json

        --results-issues
            Get the total amount of issues between errors,warning,notice that occurred for the
            result set

        --results-issues-errors
            Get the total amount of issues of type error from result set

        --results-issues-warnings
            Get the total amount of issues of type warning from result set

        --results-parsed-github
            Get results of the github html message

    -s, --set-token <SET_TOKEN>
            Set the API token to use for requests

        --set-cv-token <SET_CV_TOKEN>
            Set the Computer Vision API token to use for request

        --set-cv-url <SET_CV_URL>
            Set the Computer Vision API endpoint to use for request

        --set-recording <SET_RECORDING>
            Enable recording audits to a directory

    -V, --version
            Print version information

SUBCOMMANDS:
    build      Build A11yWatch Lite on the local machine [defaults to docker runtime]
    crawl      Site wide scan a website url for issues
    extract    Extract results in formats for platforms
    help       Print this message or the help of the given subcommand(s)
    scan       Single page scan a website url for issues
    start      Start A11yWatch Lite on the local machine [defaults to docker runtime]
    stop       Stop A11yWatch Lite on the local machine [defaults to docker runtime]
```

### Supported Architectures

Mac, linux, and Windows.

## Features

1. `grpc` - use gRPC to connect to the litemode instance.

## Help

If you are trying to run a website that is running `localhost` inside a docker container you need to use your computers hostname instead.

In terminal run the command `hostname` and then you can use it ex: `a11ywatch crawl --url $(hostname):3000`.

In order to stop services make sure to pass in the proper flags that were used to build/start the instances. 