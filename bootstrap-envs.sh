#!/usr/bin/env bash

set -e

echo "Project env keys being bootstraped"

cpenv="sh $PWD/load-env.sh"

$cpenv

# Install api
(cd api && $cpenv  && npm run bootstrap && cd ..)

# Install cdn-server
(cd cdn-server && $cpenv  && cd ..)

# Install mav
(cd mav && $cpenv  && cd ..)

# Install example-site
(cd example-site && $cpenv  && cd ..)

# Install iframe-server
(cd iframe-server && $cpenv  && cd ..)


echo "env keys set for project"
