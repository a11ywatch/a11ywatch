# A11yWatch

[![A11yWatch](https://circleci.com/gh/A11yWatch/a11ywatch.svg?style=svg)](https://circleci.com/gh/A11yWatch/a11ywatch)[![Maintainability](https://api.codeclimate.com/v1/badges/f5fdfe29c6e911f323cf/maintainability)](https://codeclimate.com/github/A11yWatch/a11ywatch/maintainability)[![codecov](https://codecov.io/gh/A11yWatch/a11ywatch/branch/master/graph/badge.svg?token=MBV2LGQO3J)](https://codecov.io/gh/A11yWatch/a11ywatch)

![A11yWatch](https://raw.githubusercontent.com/A11yWatch/Project-Screenshots/master/banner.jpeg?raw=true "A11yWatch Logo")

the tool for accessibility, software productivity, and performance

## Getting Started

See the documentation at [https://a11ywatch.github.io/a11ywatch-docs](https://a11ywatch.github.io/a11ywatch-docs)

## Develop

This repo hosts all information about
building A11yWatch from source, how to contribute code
and documentation, who to contact about what, and etc.

If you want to build A11yWatch right away there are multiple options, the easiest way is to use docker:
Please allocate atleast 6gb of memory.

##### You have a working [Docker environment].

```
git clone https://github.com/a11ywatch/a11ywatch
cd a11ywatch
./bootstrap-envs.sh
docker-compose -f development.yml up
```

By default the ui application opens on port 3000. For the full story, head over to the [developer's documentation](https://a11ywatch.github.io/a11ywatch-docs/docs/getting-started).

## Contributing

Read the [contributing guide](/CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to A11yWatch.

Notice that contributions go far beyond pull requests and commits.
Although we love giving you the opportunity to put your stamp on A11yatch, we also are thrilled to receive a variety of [other contributions](https://a11ywatch.com/faq).

## Backers

Support us with a monthly donation and help us continue our activities. [[Become a backer](https://opencollective.com/a11ywatch#backer)]

## Support

If you need support, start with the [troubleshooting guide](https://a11ywatch.github.io/a11ywatch-docs/docs/troubleshooting),
if you still need help please contact us [contact](https://a11ywatch.github.io/a11ywatch-docs/docs/contact).

## LICENSE

check the license file in the root of the project.
