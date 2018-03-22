#!/usr/bin/env bash

source ./config.sh

docker stop -t 0 kube-front-server
docker rm kube-front-server
docker run -p 3080:80 -ti $IMAGE_NAME:$TAG --name kube-front-server