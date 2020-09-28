#!/usr/bin/env bash

set -e

# Install web
cd web
(npm install && npm run build) &
cd ..

# Install api
cd api
(npm install && npm run build) &
cd ..

# Install angelica
cd angelica
(npm install && npm run build) &
cd ..

# Install cdn-server
cd cdn-server
(npm install && npm run build) &
cd ..

# Install mav
cd mav
(npm install && npm run build) &
cd ..

# Install ui
cd ui
(npm install && npm run build) &
cd ..

# Install example-site
cd example-site
(brew install zola) &
cd ..

# Install iframe-server
cd iframe-server
(npm install && npm run build) &
cd ..

# Install logger
cd logger
(npm install && npm run build) &
cd ..

# Install watcher and make sure RUST is installed. For windows make sure to go to https://www.rust-lang.org/tools/install and manually cd into the folder and run cargo run
cd watcher
(curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh && cargo run) &
cd ..


echo "Project bootstraped and ready to run in docker or local environments"
