FROM jeffmendez19/puppateer-node-light

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN  npm run build

CMD [ "yarn", "start"]
