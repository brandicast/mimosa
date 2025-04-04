FROM node:latest

RUN mkdir -p /opt/ntfy_agent

WORKDIR /opt/ntfy_agent

COPY package.json /opt/ntfy_agent

RUN npm install

COPY *.js /opt/ntfy_agent

CMD ["node", "agent.js"]
