#!/bin/sh

/server/scripts/template-server.sh &

nginx -g "daemon off;"
