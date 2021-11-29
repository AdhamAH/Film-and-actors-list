FROM node:16.13.0 as build

WORKDIR /src

COPY ./client .


COPY /client/package.json /src/package.json

WORKDIR /src/client


RUN yarn install
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]


