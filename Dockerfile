FROM node:latest

WORKDIR /srv/app

COPY ./package.json ./

RUN npm install\
  && npm install pm2 -g

COPY . .

RUN tsc

EXPOSE 4000

CMD ["npm", "prod"]