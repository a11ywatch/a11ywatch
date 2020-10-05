# A11yWatch

[![A11yWatch](https://circleci.com/gh/A11yWatch/a11ywatch.svg?style=svg)](https://circleci.com/gh/A11yWatch/a11ywatch)

![A11yWatch](web/public/static/img/favicon.png?raw=true "A11yWatch Logo")

monolith distributed system for accessibility, performance, and other productivity improvements

## Docker

The simplest way to get started is to use docker also make sure to configue app secrets before starting.
Make sure to have [Rust](https://doc.rust-lang.org/book/ch01-01-installation.html) installed since the Watcher service requires it. In development if using docker-compose MONGODB is used on port `27017`

### Development

First time setup run `./bootstrap.sh` can skip if using docker. If building the `ui` package pass in `-f development-ui` with the inital start command below.

1.  `docker-compose -f development.yml up`

### Services

| Service                         | Container Purpose                                              | Default Port |
| ------------------------------- | -------------------------------------------------------------- | ------------ |
| [web](/web)                     | web application that interacts with the main api               | 3000         |
| [api](/api)                     | central core api for the monolith                              | 8080         |
| [mav](/mav)                     | image detector api for generating names with probability       | 8020         |
| [angelica](/angelica)           | website issue detector api engine with accessibility fixes     | 8040         |
| [watcher](/watcher)             | gather all urls/webpages api for a website                     | 8000         |
| [cdn-server](/cdn-server)       | create and store js scripts to fix web issues                  | 8090         |
| [iframe-server](/iframe-server) | render websites on proxy domain for manipulation               | 8010         |
| [example-site](/example-site)   | create and test issues for the accessibility engine (optional) | 8050         |
| [ui](/ui)                       | main central ui components that can be re-used (optional)      | 6006         |
| [logger](/logger)               | stream of all logs across micro-services (optional)            | 8022         |

### Deployment

create your git remotes and name it the directory name. You can use the `deploy.sh` script and pass in the folder to then deploy easily to the server is one solution ex: `./deploy.sh web`.

## Backers

Support us with a monthly donation and help us continue our activities. [[Become a backer](https://opencollective.com/a11ywatch#backer)]

## LICENSE

check the license file in the root of the project.
