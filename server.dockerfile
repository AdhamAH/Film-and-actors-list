FROM node:16.13.0  as build

WORKDIR /root/src

COPY ./server .

COPY /server/package.json /src/package.json

WORKDIR /root/src/server

RUN yarn install


ENV NODE_ENV production

RUN yarn build

EXPOSE 4000

CMD ["yarn", "start"]
