#!/usr/bin/env bash

set -e

echo "Project being boostraped"

cpenv="cp .env.example.txt .env"
node_build="npm install && npm run build"

($cpenv) &

# Install web
cd web
($cpenv && $node_build) &
cd ..

# Install api
cd api
($cpenv && $node_build) &
cd ..

# Install angelica
cd angelica
($cpenv && $node_build) &
cd ..

# Install cdn-server
cd cdn-server
($cpenv && $node_build) &
cd ..

# Install mav
cd mav
($cpenv && $node_build) &
cd ..

# Install ui
cd ui
($node_build) &
cd ..

# Install example-site
cd example-site
($cpenv && brew install zola && brew upgrade zola) &
cd ..

# Install iframe-server
cd iframe-server
($cpenv && $node_build) &
cd ..

# Install logger
cd logger
($cpenv && $node_build) &
cd ..

# Install watcher and make sure RUST is installed. For windows make sure to go to https://www.rust-lang.org/tools/install and manually cd into the folder and run cargo run
cd watcher
($cpenv && curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh && cargo run) &
cd ..

echo "Ready to run in docker or local environments"
