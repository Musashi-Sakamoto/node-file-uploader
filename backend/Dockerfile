FROM node:8

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

RUN mkdir /backend
WORKDIR /backend
ADD package.json /backend/
ADD package-lock.json /backend/
RUN npm install