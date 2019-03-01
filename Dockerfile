FROM node:current-alpine

WORKDIR /usr/app

COPY . .

# TODO: Remove nodemon; dev only tool
RUN npm i && npm i -g nodemon

CMD ["npm", "start"]
