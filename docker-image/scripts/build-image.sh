#!/usr/bin/env bash

# MUST be executed from parent directory

yarn install
yarn clean-compile

docker build . -t kube-frontend-server:0.1