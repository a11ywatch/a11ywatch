#!/usr/bin/env bash

set -e

echo "Project being boostraped"

cp .env.example.txt .env

# Install web
cd web
(npm install && npm run build) & cp .env.example.txt .env &
cd ..

# Install api
cd api
(npm install && npm run build) & cp .env.example.txt .env &
cd ..

# Install angelica
cd angelica
(npm install && npm run build) & cp .env.example.txt .env &
cd ..

# Install cdn-server
cd cdn-server
(npm install && npm run build) & cp .env.example.txt .env &
cd ..

# Install mav
cd mav
(npm install && npm run build) & cp .env.example.txt .env &
cd ..

# Install ui
cd ui
(npm install && npm run build) &
cd ..

# Install example-site
cd example-site
(brew install zola && brew upgrade zola) &
cd ..

# Install iframe-server
cd iframe-server
(npm install && npm run build) & cp .env.example.txt .env &
cd ..

# Install logger
cd logger
(npm install && npm run build) & cp .env.example.txt .env &&
cd ..

# Install watcher and make sure RUST is installed. For windows make sure to go to https://www.rust-lang.org/tools/install and manually cd into the folder and run cargo run
cd watcher
(curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh && cargo run) & cp .env.example.txt .env &
cd ..


echo "Ready to run in docker or local environments"
