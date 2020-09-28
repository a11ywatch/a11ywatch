#!/bin/sh

REMOTE=$1

if [ "$REMOTE" == "web" ]; then
	git subtree push --prefix web web master
elif [ "$REMOTE" == "api" ]; then
	git subtree push --prefix api api master
elif [ "$REMOTE" == "mav" ]; then
	git subtree push --prefix mav mav master
elif [ "$REMOTE" == "cdn-server" ]; then
	git subtree push --prefix cdn-server cdn-server master
elif [ "$REMOTE" == "watcher" ]; then
	git subtree push --prefix watcher watcher master
elif [ "$REMOTE" == "iframe-server" ]; then
	git subtree push --prefix iframe-server iframe-server master
elif [ "$REMOTE" == "example-site" ]; then
	git subtree push --prefix example-site example-site master
else
	echo "No remote set. Use 'git remote add alias path' for more info look up adding git remotes."
fi
