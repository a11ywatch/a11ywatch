# A11yWatch

![A11yWatch](https://raw.githubusercontent.com/A11yWatch/Project-Screenshots/master/banner.jpeg?raw=true "A11yWatch Logo")

web accessibility automation.

## Getting Started

See the documentation at [https://a11ywatch.github.io/docs](https://a11ywatch.github.io/docs)

## Develop

This repo hosts all information about
building A11yWatch from source, how to contribute code
and documentation, who to contact about what, and etc. If you are using the apple silicon chip or m1 you need to run the `dev.m1.yml` instead of `dev.yml` and setup tensorflow from source locally and start the `mav` container local. We are working on getting this universal across all builds. 

`docker compose --file dev.yml up`

##### [Docker environment].

```
git clone https://github.com/a11ywatch/a11ywatch
cd a11ywatch
docker-compose up
```

##### Front-End Client

For a client to use you can use the web application here that is [web-app](https://github.com/A11yWatch/a11ywatch-web), [ios-app](https://github.com/A11yWatch/a11ywatch-ios), or [android-app](https://github.com/A11yWatch/a11ywatch-android). The most up to date option at the moment is the web application. The mobile apps are a WIP.
By default the ui application opens on port 3000. For the full story, head over to the [developer's documentation](https://a11ywatch.github.io/a11ywatch-docs/docs/getting-started).

## Contributing

Read the [contributing guide](/CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to A11yWatch.

Notice that contributions go far beyond pull requests and commits.
Although we love giving you the opportunity to put your stamp on A11yWatch, we also are thrilled to receive a variety of [other contributions](https://a11ywatch.com/faq).

## Backers

Support us with a monthly donation and help us continue our activities. [[Become a backer](https://opencollective.com/a11ywatch#backer)]

## Support

If you need support, start with the [troubleshooting guide](https://a11ywatch.github.io/docs/troubleshooting),
if you still need help please contact us [contact](https://a11ywatch.github.io/docs/blog).

## LICENSE

check the license file in the root of the project.
