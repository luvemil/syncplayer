FROM node:4

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY package.json /usr/src/app

RUN npm install

COPY bower.json /usr/src/app
RUN npm run bower

COPY . /usr/src/app
RUN npm run gulp

COPY public /usr/src/app

EXPOSE 3000

CMD ["npm", "start"]
