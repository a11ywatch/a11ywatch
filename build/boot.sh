#!/bin/bash

cat my_password.txt | docker login --username $1 --password-stdin

docker run docker/compose:1.24.0

sh ${0%/*}/pull-images.sh

docker run --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v "$PWD:$PWD" \
    -w="$PWD" \
    docker/compose:1.24.0 up -d

shopt -s expand_aliases

echo alias docker-compose="'"'docker run --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v "$PWD:$PWD" \
    -w="$PWD" \
    docker/compose:1.24.0'"'" >> ~/.bashrc

source ~/.bashrc