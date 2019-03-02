FROM node:current-alpine

WORKDIR /usr/app

COPY . .

RUN npm i

# Uncomment the following line AND line 9 in docker-compose to enable hot reloading 
# RUN npm i -g nodemon

CMD ["npm", "start"]
