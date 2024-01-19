FROM node:18 as build
WORKDIR /build
COPY package*.json .
COPY src/ src/
COPY tsconfig.json .
RUN npm install
RUN npm run build

FROM node:18 as runner
WORKDIR /app
COPY package*.json .
COPY --from=build build/node_modules/ node_modules/ 
COPY --from=build build/build/ build/
EXPOSE 8000
CMD [ "node","build/index.js"]

# sudo docker run -it -p 8080:8080  -e MONGO_URI="mongodb+srv://pradeepkundekar1010:68CcvC1VfqefJAF2@cluster0.ukfedbk.mongodb.net/?retryWrites=true&w=majority"  -e JWT_SECRET="secret123"  --name coderbro12 coderbro-image  