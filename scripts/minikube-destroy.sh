#!/usr/bin/env bash

source ./manifests.sh

cd ..

for i in "${MANIFEST_GROUPS[@]}"
do
    kubectl delete -f $i
done