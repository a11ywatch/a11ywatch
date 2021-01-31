#!/usr/bin/env bash

set -e

echo "Project env keys being bootstraped"

cpenv="sh $PWD/load-env.sh"

$cpenv

# Install web
(cd web && $cpenv  && cd ..)

# Install api
(cd api && $cpenv  && npm run bootstrap && cd ..)

# Install angelica
(cd angelica && $cpenv  && cd ..)

# Install cdn-server
(cd cdn-server && $cpenv  && cd ..)

# Install mav
(cd mav && $cpenv  && cd ..)

# Install example-site
(cd example-site && $cpenv  && cd ..)

# Install iframe-server
(cd iframe-server && $cpenv  && cd ..)

# Install logger
(cd logger && $cpenv  && cd ..)

# Install watcher and make sure RUST is installed. For windows make sure to go to https://www.rust-lang.org/tools/install and manually cd into the folder and run cargo run
(cd watcher && $cpenv && cd ../)

echo "env keys set for project"
