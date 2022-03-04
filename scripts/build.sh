#!/bin/sh

docker buildx build --platform=linux/amd64 -t a11ywatch/a11ywatch-core ../a11ywatch-core &
docker buildx build --platform=linux/amd64 -t a11ywatch/pagemind ../pagemind
wait
docker buildx build --platform=linux/amd64 -t a11ywatch/mav ../mav  &
docker buildx build --platform=linux/amd64 -t a11ywatch/crawler ../crawler
wait 
docker buildx build --platform=linux/amd64 -t a11ywatch/elastic-cdn ../elastic-cdn & 
docker buildx build --platform=linux/amd64 -t a11ywatch/web ../a11ywatch-web