FROM node:14.17.3

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm cache clean --force
ENV SECRET_KEY="secret_key"
ENV NPM_CONFIG_PRODUCTION=false

RUN npm install 

COPY . .

RUN npm run build

CMD ["npm","run","start:prod"]