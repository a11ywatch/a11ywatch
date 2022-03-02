#!/bin/sh

if ! [ -x "$(command -v docker)" ]; then
    echo "Please install docker and docker-compose: https://docs.docker.com/get-docker/"
    exit 1
fi

docker compose --file docker-compose.yml up -d
