FROM node:14.15.0-slim
WORKDIR /app
COPY index.js .
COPY package.json .
RUN npm install
CMD [ "npm", "start" ]