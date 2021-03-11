# web

a11ywatch clientside web application

## Installation

```
npm install
```

## About

project is setup to run as a multi-domain client. You can see examples of files named `a11y, adanet, enable` in the `src/content/strings/` folder and other locations to show seperation of static content. All pages are current rendered SSG using next.js.

## Google Login

In order for google login to work please add the env variable `GOOGLE_CLIENT_ID` with your id to your .env file.

## Start

`npm run dev`

check https://localhost:3000

## Iframe local website

in order to enable iframe rending to get websites with annotations currently you need to start the container or app using
`npm run dev:server`. Theres a work in progress to try to replicate this without needing a server proxy.

## LICENSE

check the license file in the root of the project.
