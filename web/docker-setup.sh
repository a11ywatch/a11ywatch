#!/bin/bash
GITHUB_TOKEN=$1
NODE_ENV=$2

if [[ -n "$GITHUB_TOKEN" ]]; then
	echo "@a11ywatch:registry=https://npm.pkg.github.com" >> .npmrc
	echo "//npm.pkg.github.com/:_authToken=$GITHUB_TOKEN" >> .npmrc
	echo .npmrc
else
	echo "missing github token"
fi

# if [ $NODE_ENV="development" ]; then
# 	cat <<< $(jq 'del(.dependencies."@a11ywatch/ui")' package.json) > package.json
# 	npm install
# else
# 	if [[ -n "$GITHUB_TOKEN" ]]; then
# 		echo "@a11ywatch:registry=https://npm.pkg.github.com" >> .npmrc
# 		echo "//npm.pkg.github.com/:_authToken=$GITHUB_TOKEN" >> .npmrc
# 		echo .npmrc
# 	else
# 		echo "missing github token"
# 	fi
# fi
