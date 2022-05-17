FROM node:16-alpine as builder
RUN apk add --no-cache --virtual .build-deps python3 make g++
COPY package.json package-lock.json tsconfig.json ./
COPY src src
RUN npm ci && npm run tsc

FROM node:16-alpine as app
WORKDIR /usr/src/app
RUN apk add git postgresql-client
COPY --from=builder ./node_modules ./node_modules
COPY --from=builder ./dist ./dist
COPY ./.git ./.git
COPY databases/*.sql databases/
EXPOSE 8080
CMD node /usr/src/app/dist/src/index.js