# A11yWatch

[![A11yWatch](https://circleci.com/gh/A11yWatch/a11ywatch.svg?style=svg)](https://circleci.com/gh/A11yWatch/a11ywatch)[![Maintainability](https://api.codeclimate.com/v1/badges/f5fdfe29c6e911f323cf/maintainability)](https://codeclimate.com/github/A11yWatch/a11ywatch/maintainability)

![A11yWatch](web/public/static/img/favicon.png?raw=true "A11yWatch Logo")

system for accessibility, software productivity, and performance

## Getting started with A11yWatch

See our documentation on [a11ywatch.com](https://a11ywatch.github.io/a11ywatch-docs)

## To start developing A11yWatch

This repo hosts all information about
building A11yWatch from source, how to contribute code
and documentation, who to contact about what, etc.

If you want to build A11yWatch right away there are two options:

##### You have a working [Rust environment].

Don't worry we take care of this upon project bootstrap if you do not.

```
mkdir -p a11y_core/a11ywatch
cd a11y_core/a11ywatch
git clone https://github.com/a11ywatch/a11ywatch
cd a11ywatch
./bootstrap.sh
# now you can start each service in each sub dir with `npm start` or `npm run dev`
```

##### You have a working [Docker environment].

```
git clone https://github.com/a11ywatch/a11ywatch
cd a11ywatch
./bootstrap-envs.sh
docker-compose -f development.yml up
```

For the full story, head over to the [developer's documentation](https://a11ywatch.github.io/a11ywatch-docs/docs/getting-started).

## Backers

Support us with a monthly donation and help us continue our activities. [[Become a backer](https://opencollective.com/a11ywatch#backer)]

## Support

If you need support, start with the [troubleshooting guide](https://a11ywatch.github.io/a11ywatch-docs/docs/troubleshooting),
if you still need help please contact us [contact](https://a11ywatch.github.io/a11ywatch-docs/docs/contact).

## LICENSE

check the license file in the root of the project.
