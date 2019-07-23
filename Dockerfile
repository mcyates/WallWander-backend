FROM node:latest

WORKDIR /usr/src/smart-brain-api

COPY package.json ./

RUN npm install
RUN npm run compile

COPY . .

EXPOSE 4000

CMD ["npm", "start"]