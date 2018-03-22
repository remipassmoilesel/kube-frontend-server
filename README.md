# kube-front-server

## Introduction

TODO :)

## Available commands

    "start"         : "npm run docker-build && cd scripts && ./launch-example.sh",
    "lint"          : "./node_modules/.bin/tslint --force --format verbose 'src/**/*.ts'",
    "lint-fix"      : "npm run lint -- --fix",
    "clean"         : "./node_modules/.bin/rimraf build",
    "compile"       : "tsc --pretty",
    "compile-watch" : "tsc --pretty -w",
    "clean-compile" : "npm run clean && npm run compile",
    "docker-build"  : "cd scripts && ./build-image.sh",
    "minikube-path-host"    : "cd scripts && ./path-hosts.sh",
    "minikube-docker-build" : "cd scripts && ./build-image-minikube.sh",
    "minikube-deploy"       : "kubectl create -f manifests/",
    "minikube-destroy"      : "kubectl delete -f manifests/",
    "minikube-clean-deploy" : "npm run minikube-destroy; npm run minikube-deploy"