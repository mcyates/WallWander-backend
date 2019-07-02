FROM node:latest

WORKDIR /usr/src/smart-brain-api

COPY package*.json ./

RUN npm install
RUN tsc

COPY . .

EXPOSE 4000

CMD ["node", "./dist/index.js"]

# docker build -t server .
# docker run -it -p 4000:4000