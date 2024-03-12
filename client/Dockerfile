FROM node:20 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:20
WORKDIR /app


COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist


RUN npm install 


EXPOSE 5173

CMD ["npm", "run", "dev"]
