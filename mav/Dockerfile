FROM jeffmendez19/tensorflow-node-gpu

WORKDIR /usr/src/app

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN apt-get install -y nodejs

COPY package*.json ./

RUN npm install

COPY . .

RUN  npm run build

CMD [ "node", "dist/index.js"]

