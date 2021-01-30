#! /bin/bash

ENV_FILE=.env

if [[ ! -e "$ENV_FILE" ]]; then
	echo "creating env file from sample env"
	cp .env.example.txt .env
else
  echo "env file already loaded for ${PWD##*/}"
fi