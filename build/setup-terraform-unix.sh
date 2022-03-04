#!/bin/bash

# homebrew install
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
brew install --cask google-cloud-sdk
brew update
brew upgrade hashicorp/tap/terraform

terraform -install-autocomplete

cd terrafrom && terraform init
cd ../