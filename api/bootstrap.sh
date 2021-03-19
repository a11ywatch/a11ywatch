#!/bin/sh

PRIVATE_KEY=private.key
PUBLIC_KEY=public.key

if [[ ! -e "$PRIVATE_KEY" ]]; then
	echo "creating private key"
	openssl genrsa -out $PRIVATE_KEY ${2:-4096}
fi

if [[ ! -e "$PUBLIC_KEY" ]]; then
	echo "creating public key"
	openssl rsa -in $PRIVATE_KEY -out $PUBLIC_KEY -pubout
fi

