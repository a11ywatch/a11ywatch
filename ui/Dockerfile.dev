FROM node:13-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY tsconfig.json ./tsconfig.json
COPY src ./src

RUN npm install

COPY . .

CMD [ "npm", "run", "storybook" ]
