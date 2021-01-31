#!/usr/bin/env bash

set -e

echo "Project being bootstraped"

cpenv="sh $PWD/load-env.sh"

node_build="npm run build"
node_install="npm install"

$cpenv

sh bootstrap-envs.sh

# Install web
(cd web && $node_install && cd ..)

# Install api
(cd api && $node_install && npm run bootstrap && cd ..)

# Install angelica
(cd angelica && $node_install && cd ..)

# Install cdn-server
(cd cdn-server && $node_install && cd ..)

# Install mav
(cd mav && $node_install && cd ..)

# Install example-site
(cd example-site && $node_install && cd ..)

# Install iframe-server
(cd iframe-server && $node_install && cd ..)

# Install logger
(cd logger && $node_install && cd ..)

# Install watcher and make sure RUST is installed. For windows make sure to go to https://www.rust-lang.org/tools/install and manually cd into the folder and run cargo run
(cd watcher && curl https://sh.rustup.rs -sSf | sh -s -- -y && cargo build && cd ../)

echo "Ready to run in docker or local environments"
