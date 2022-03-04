#!/bin/bash

cd terraform 

if [[ `uname -m` == 'arm64' ]]; then
    FILE=./terraform
    if [ -f "$FILE" ]; then
        $FILE destroy -auto-approve
    else
        echo "make sure to have the $FILE m1 binary of terraform installed placed in the terraform folder."
        echo "view https://github.com/hashicorp/terraform/issues/27257 for instructions on how."
    fi
else 
  terraform destroy -auto-approve
fi

cd ../
