#!/bin/bash

sudo fallocate -l 1G ./swapfile
sudo chmod 600 ./swapfile
sudo mkswap ./swapfile
sudo swapon ./swapfile

echo './swapfile none swap sw 0 0' | sudo tee -a /etc/fstab