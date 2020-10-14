    #!/bin/bash

	if [[ -n "$CRAWL_URL" ]]; then
		echo "CRAWL_URL=$CRAWL_URL" >> .env
		echo .env
	else
		echo "missing crawl url env var"
	fi