FROM node:24-slim

# Apply all available OS security patches (fixes e.g. perl-base CVEs)
# and upgrade npm to latest (fixes tar CVE inside npm's internal bundle)
RUN apt-get update && apt-get upgrade -y && apt-get clean && rm -rf /var/lib/apt/lists/*
RUN npm install -g npm@latest

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]
