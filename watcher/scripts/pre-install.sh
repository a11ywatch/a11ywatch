    #!/bin/bash

	if [[ -n "$CRAWL_URL" ]]; then
		echo "CRAWL_URL=$GITHUB_TOKEN" >> .env
		echo .env
	else
		echo "missing crawl url env var"
	fi