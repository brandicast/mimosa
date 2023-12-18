FROM node:latest

RUN mkdir -p /opt/bot

WORKDIR /opt/bot

COPY package.json /opt/bot

RUN npm install

COPY *.js /opt/bot

COPY ./resources/ /opt/bot/resources/

EXPOSE 9999

CMD ["node", "bot.js"]
