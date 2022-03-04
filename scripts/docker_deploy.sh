#!/bin/sh

./scripts/build.sh

docker push a11ywatch/a11ywatch-core &
docker push a11ywatch/pagemind &
wait
docker push a11ywatch/mav &
docker push a11ywatch/crawler &
wait
docker push a11ywatch/elastic-cdn & 
docker push a11ywatch/web