#!/bin/bash

cat my_password.txt | docker login --username $1 --password-stdin

docker run docker/compose:1.24.0

sh ${0%/*}/pull-images.sh