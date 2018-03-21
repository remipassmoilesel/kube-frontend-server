FROM nginx:1.13.9-alpine

RUN mkdir -p /server
RUN mkdir -p /logs

COPY build /server/build
COPY front-applications /server/front-applications
COPY scripts /server/scripts
COPY config.js /server/config.js
COPY package.json /server/package.json

RUN apk update \
      && apk add nodejs \
      && npm install -g yarn

RUN cd /server \
      && yarn --production

ENTRYPOINT /server/scripts/entrypoint.sh
