    #!/bin/bash

	if [[ -n "$DOMAIN_NAME" ]]; then
		echo "Sitemap: $DOMAIN_NAME/sitemap.xml" >> public/robots.txt
		echo "" >> public/robots.txt
		echo "User-agent: *" >> public/robots.txt
		echo "Allow: /*" >> public/robots.txt
		echo "" >> public/robots.txt
		echo "Disallow: /api/*" >> public/robots.txt
		echo "Disallow: /website-details/*" >> public/robots.txt
		echo "Disallow: /iframe/*" >> public/robots.txt
		echo "Disallow: /dashboard" >> public/robots.txt
		echo "Disallow: /profile" >> public/robots.txt
		echo "Disallow: /cdn-fix" >> public/robots.txt
		echo "Disallow: /web-issues" >> public/robots.txt
		echo "Disallow: /scripts" >> public/robots.txt
		echo "Disallow: /history" >> public/robots.txt
		echo "Disallow: /urgent-issues" >> public/robots.txt
		echo "Disallow: /payments" >> public/robots.txt
		echo public/robots.txt
	else
		echo "missing domain name"
	fi