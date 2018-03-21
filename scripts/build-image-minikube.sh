#!/usr/bin/env bash

# Begin use of Minikube Docker host
eval $(minikube docker-env)

source ./build-image.sh

# End of use of Minikube Docker host
eval $(minikube docker-env -u)