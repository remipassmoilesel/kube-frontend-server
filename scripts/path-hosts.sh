#!/usr/bin/env bash

set -x

sudo bash -c "echo '192.168.99.100 domain1.com' >> /etc/hosts"
sudo bash -c "echo '192.168.99.100 domain2.com' >> /etc/hosts"