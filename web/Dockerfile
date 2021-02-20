FROM node:14.7.0-alpine

WORKDIR /usr/src/app 

COPY package*.json .env ./

RUN apk --no-cache add --virtual native-deps \
	g++ gcc libgcc libstdc++ linux-headers make python && \
	npm install --quiet node-gyp -g &&\
	npm install --quiet && \
	apk del native-deps

COPY . .

RUN npm run build

CMD [ "NODE_ENV=production", "node", "./dist/server.js" ]
