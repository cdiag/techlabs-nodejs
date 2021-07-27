FROM alpine:latest

RUN apk add nodejs npm --no-cache

WORKDIR /app
COPY . /app
COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 3000
ENTRYPOINT ["npm", "app"]