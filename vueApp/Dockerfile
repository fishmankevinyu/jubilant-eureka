FROM node:lts-alpine
# replace this with your application's default port
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "run", "dev"]
EXPOSE 5173