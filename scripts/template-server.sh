#!/bin/sh

export NODE_ENV = 'production';

## TODO: replace with monit
while true; do

   PORT=3000 node /server/build/main.js

   echo
   echo "Error, templating server failed with code: $?"
   echo

done
