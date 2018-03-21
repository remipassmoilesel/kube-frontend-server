#!/usr/bin/env bash

source ./config.sh

cd ..

yarn install
yarn clean-compile

docker build . -t kube-frontend-server:$TAG