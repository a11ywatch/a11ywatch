#!/bin/sh

./scripts/build.sh

docker push a11ywatch/a11ywatch-core
docker push a11ywatch/pagemind
docker push a11ywatch/mav
docker push a11ywatch/crawler
docker push a11ywatch/elastic-cdn