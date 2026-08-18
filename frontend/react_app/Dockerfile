FROM node:24-alpine

# Apply all available OS security patches and upgrade npm (fixes tar CVE in npm bundle)
RUN apk update && apk upgrade --no-cache
RUN npm install -g npm@latest

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]
