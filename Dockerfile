FROM node:4

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY package.json /usr/src/app

RUN npm install

RUN npm install -g bower gulp

COPY bower.json /usr/src/app
RUN bower --allow-root install

COPY gulpfile.js /usr/src/app
RUN gulp build

COPY . /usr/src/app

EXPOSE 3000

CMD ["npm", "start"]
