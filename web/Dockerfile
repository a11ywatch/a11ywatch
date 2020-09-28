FROM node:12.0.0-alpine

WORKDIR /usr/src/app 

ARG GITHUB_TOKEN
ARG NODE_ENV

RUN apk add --update bash jq

COPY package*.json .env docker-setup.sh ./

# RUN chmod +x ./docker-setup.sh && ./docker-setup.sh $GITHUB_TOKEN $NODE_ENV

RUN npm install

COPY . .

RUN npm run build

CMD [ "yarn", "start" ]
