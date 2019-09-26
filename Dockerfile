FROM node:latest

WORKDIR /srv/app

COPY ./package.json ./

RUN npm install
RUN npm install -g pm2

COPY . .

RUN tsc

CMD ["npm", "run", "prod"]