FROM node:6-onbuild

RUN npm install -g bower gulp
RUN bower --allow-root install
RUN gulp build
COPY . /usr/src/app

EXPOSE 3000
