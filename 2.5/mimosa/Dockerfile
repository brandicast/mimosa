FROM node:latest

RUN mkdir -p /opt/mimosa

WORKDIR /opt/mimosa

COPY package.json /opt/mimosa

RUN npm install

COPY *.js /opt/mimosa

EXPOSE 9613

CMD ["node", "mimosa.js"]
