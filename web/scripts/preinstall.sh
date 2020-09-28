    #!/bin/bash

	if [[ -n "$GITHUB_TOKEN" ]]; then
		echo "@a11ywatch:registry=https://npm.pkg.github.com" >> .npmrc
		echo "//npm.pkg.github.com/:_authToken=$GITHUB_TOKEN" >> .npmrc
	else
		echo "missing github token"
	fi