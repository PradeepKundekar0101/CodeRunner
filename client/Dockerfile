FROM node:14 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:14-alpine
WORKDIR /app


COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist


RUN npm install 


EXPOSE 3000

CMD ["npm", "dev"]
