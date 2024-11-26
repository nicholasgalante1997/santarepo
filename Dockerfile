FROM oven/bun:latest AS base

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
COPY ./bun.lockb .
COPY ./turbo.json .
COPY ./tsconfig.json .

COPY ./apps/**/package.json ./apps/**/package.json
COPY ./packages/**/package.json ./packages/**/package.json

RUN bun install --frozen-lockfile

COPY ./apps ./apps
COPY ./packages ./packages

RUN bun run build

RUN rm -rf node_modules \
    apps/**/node_modules \
    packages/**/node_modules

RUN bun install --production --frozen-lockfile

ENV NODE_ENV=production

USER bun

EXPOSE 3000/tcp
EXPOSE 4100/tcp
EXPOSE 4200/tcp
EXPOSE 4300/tcp

ENTRYPOINT [ "bun", "start" ]