FROM node:14.0.0-alpine AS BUILD_IMAGE

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN yarn build

FROM node:14.0.0-alpine

WORKDIR /usr/src/app

# copy from build image
COPY --from=BUILD_IMAGE /usr/src/app/dist ./dist
COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /usr/src/app/.env ./.env
COPY --from=BUILD_IMAGE /usr/src/app/private.key ./private.key
COPY --from=BUILD_IMAGE /usr/src/app/public.key ./public.key

CMD [ "node", "./dist/index.js" ]
