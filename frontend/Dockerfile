FROM node:8.15
ENV ROOT /frontend

WORKDIR $ROOT
COPY package.json $ROOT
COPY package-lock.json $ROOT
RUN npm install

COPY . $ROOT
EXPOSE 8000
EXPOSE 35729
CMD ["npm", "run", "dev"]
