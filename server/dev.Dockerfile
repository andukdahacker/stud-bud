FROM node:buster-slim as development

RUN apt-get update && apt-get install --no-install-recommends --yes openssl

WORKDIR /usr/src/server

COPY package*.json .
COPY ./prisma ./prisma

RUN npm install
RUN npx prisma generate
COPY . .

CMD ["npm", "run", "dev"]