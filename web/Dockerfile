FROM node:12.0.0-alpine

WORKDIR /usr/src/app 

ARG NODE_ENV

RUN apk add --update bash jq

COPY package*.json .env ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "yarn", "start" ]
