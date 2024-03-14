FROM node:18
WORKDIR /app
COPY package.json .
COPY Actions.js .
RUN npm install
COPY . .
EXPOSE 3001
CMD [ "node","src/index.js" ]