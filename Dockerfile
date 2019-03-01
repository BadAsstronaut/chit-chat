FROM node:current-alpine

WORKDIR /usr/app

COPY package.json .

RUN npm i

COPY src ./src/

CMD ["npm", "start"]
