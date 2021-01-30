FROM node:12.0.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN yarn bootstrap

RUN yarn build

CMD [ "node", "./dist/index.js" ]
