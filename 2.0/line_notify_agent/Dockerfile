FROM node:latest

RUN mkdir -p /opt/line_notify_agent

WORKDIR /opt/line_notify_agent

COPY package.json /opt/line_notify_agent

RUN npm install

COPY *.js /opt/line_notify_agent

CMD ["node", "agent.js"]
