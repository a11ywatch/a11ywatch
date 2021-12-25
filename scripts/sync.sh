#!/bin/sh

## sync main repos
cd ../a11ywatch-core && git pull origin main
cd ../a11ywatch-web && git pull origin main
cd ../crawler && git pull origin main
cd ../pagemind && git pull origin main
cd ../mav && git pull origin main
cd ../logger && git pull origin main
cd ../elastic-cdn && git pull origin main