FROM node:20 AS react_app

WORKDIR /react_app

COPY . .

RUN npm install
RUN npm run build
