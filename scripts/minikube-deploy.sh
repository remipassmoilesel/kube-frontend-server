#!/usr/bin/env bash

source ./config.sh

cd ..

for i in "${MANIFEST_GROUPS[@]}"
do
    kubectl create -f $i
done
