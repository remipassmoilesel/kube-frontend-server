#!/usr/bin/env bash

export IMAGE_NAME=kube-frontend-server
export TAG=0.1

MANIFEST_GROUPS=(
    manifests/front-server
    manifests/traefik
)
