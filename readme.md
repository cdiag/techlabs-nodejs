## Start NodeJS App
Run `node app.js` or `npm app`

## Start Database
Run `docker run -d -p 27017-27019:27017-27019 --name mongodb mongo` for the first time.
After that `docker start mongodb` or `npm database`

## Start Both
Run `npm start`

## Start with Docker
At first you need to start the Database. Afterwards build the Container with `docker build -t techlabs_backen .` and start it with `docker run --name techlabsBackend -p 127.0.0.1:3000:3000 -e DB_NAME=exampleTechlabs -e DB_HOST=exampleMongoService -e DB_PORT=27017 --network techlabsNetwork -d techlabs_backen`

## Start with Docker-Compose
Start the Multicontainer application with `docker-compose up -d` and stopt itwith `docker-compose down`
