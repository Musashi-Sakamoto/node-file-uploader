FROM node:8

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

RUN mkdir /backend
WORKDIR /backend
COPY . /backend
ADD package.json /backend/
ADD package-lock.json /backend/
ENV PORT=${PORT}
RUN npm install
CMD npm start