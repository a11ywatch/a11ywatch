#!/bin/sh


if [[ `uname -m` == 'arm64' ]]; then
  # todo remove m1 file and simply configure dev.yml to handle m1 configuration
  docker compose --file dev.m1.yml up -d --build
else 
  docker compose --file dev.yml up -d --build
fi