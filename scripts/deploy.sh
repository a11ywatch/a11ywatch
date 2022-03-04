#!/bin/bash

mkdir -p -m 777 ./terraform/uploads

sh ./cgi/copy-files.sh

cd terraform

terraform apply -auto-approve

ssh -oStrictHostKeyChecking=no terraform@$(terraform output -raw public_ip) -i ./tf-cloud-init "sh /home/terraform/build/boot.sh"

cd ../