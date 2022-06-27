# a11ywatch-cli

The A11yWatch Command Line Interface. View the [cli-docs](https://docs.a11ywatch.com/documentation/cli/) for more complete info.

## Build

Get the CLI by running the command below.

```sh
cargo install a11ywatch_cli
```

Then run `a11ywatch -h` to get all options.

```sh
# start the instance. If you need the front-end client passing the -f option [min of 1.25gb of memory required alloc to docker resource].
a11ywatch start
# scan a url and pipe the stdout to a file.
a11ywatch scan --url https://a11ywatch.com > results.json
# scan a website multi page and pipe the stdout to a file.
a11ywatch crawl --url https://a11ywatch.com > results.json
# scan a website multi page and include subdomains.
a11ywatch crawl --url https://a11ywatch.com -S > results.json
# scan a website multi page and include subdomains and all TLD extensions.
a11ywatch crawl --url https://a11ywatch.com -S -t > results.json
# if you need to upgrade the instance to new images run with the upgrade flag.
a11ywatch start --upgrade
# start the instance with the front-end on port 3270.
a11ywatch start -f
```

## ENV

Here are env vars that you can configure to enhance the system abilities.
You can get your [Computer Vision](https://azure.microsoft.com/en-us/services/cognitive-services/computer-vision/) API key here.
Grab your [PageSpeed](https://developers.google.com/speed/docs/insights/v5/get-started#APIKey) API key to speed up lighthouse parallel runs.

Example of a `.env` file below:

```
COMPUTER_VISION_SUBSCRIPTION_KEY="REPLACE_WITH_KEY"
COMPUTER_VISION_ENDPOINT="REPLACE_WITH_ENDPOINT"
PAGESPEED_API_KEY="REPLACE_WITH_PAGESPEED_API_KEY"
```

You can also use the CLI to configure your Computer Vision creditials.

```sh
# replace $mycv_token and $myvcvname with your project name and CV API url
a11ywatch --set-cv-token $mycv_token
a11ywatch --set-cv-url https://$myvcvname.cognitiveservices.azure.com/
```

```sh
a11ywatch_cli 0.3.1
j-mendez <jeff@a11ywatch.com>
A11yWatch accessibility CLI.

USAGE:
    a11ywatch [OPTIONS] [SUBCOMMAND]

OPTIONS:
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

    -r, --results-parsed
            Get results file parsed to json

        --results-issues
            Get the total amount of issues between errors,warning,notice that occured for the result
            set

        --results-issues-errors
            Get the total amount of issues of type error from result set

        --results-issues-warnings
            Get the total amount of issues of type warning from result set

        --results-parsed-github
            Get results of the github html message

    -s, --set-token <SET_TOKEN>
            Set the API token to use for request

        --set-cv-token <SET_CV_TOKEN>
            Set the Computer Vision API token to use for request

        --set-cv-url <SET_CV_URL>
            Set the Computer Vision API endpoint to use for request

    -V, --version
            Print version information

SUBCOMMANDS:
    build        Build the project on the local machine [defaults to docker runtime]
    crawl        Site wide scan a website url for issues
    deploy       Deploy the build on remote infrastructure [BETA - defaults: GCP]
    extract      Extract results in formats for platforms
    help         Print this message or the help of the given subcommand(s)
    scan         Single page scan a website url for issues
    start        Start the application on the local machine [defaults to docker runtime]
    stop         Stop the project on the local machine [defaults to docker runtime]
    terminate    Destroy the build on remote infrastructure [BETA - defaults: GCP]
```

### Supported Architectures

Mac, linux, and Windows.

### BETA

The following commands are currently in BETA and require you to have the repo locally [tf-provider](https://github.com/A11yWatch/terraform-provider) and set to your directory.

1. deploy (TERRAFORM)
1. destroy (TERRAFORM)

The scan sub command with the runner option and the remote deployment commands are a work in progress. You may experience issues with the sub commands, feel free to leave an issue when found. In general the CLI is in BETA and may contain breaking changes until v1.
