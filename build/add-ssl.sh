#!/bin/bash

# pass in your domain name with ext for ssl

docker run --rm \
    -v /etc/letsencrypt:/etc/letsencrypt:rw \
    -v /tmp/gc-service.json:/var/gc-service.json \
    certbot/dns-google certonly \
        --dns-google \
        --dns-google-credentials /tmp/gc-service.json \
        --dns-google-propagation-seconds 90 \
        --agree-tos -m $1 --non-interactive \
        -d $1