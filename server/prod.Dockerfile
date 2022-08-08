FROM node:buster-slim as build

RUN apt-get update && apt-get install --no-install-recommends --yes openssl

WORKDIR /usr/src/server

COPY package*.json .
COPY ./prisma ./prisma

RUN npm install
RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:buster-slim as production

RUN apt-get update && apt-get install --no-install-recommends --yes openssl

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/server

COPY package*.json .
COPY ./prisma ./prisma
COPY .env .
COPY --from=build /usr/src/server/dist ./dist

RUN npm ci --only-production
RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run", "start"]