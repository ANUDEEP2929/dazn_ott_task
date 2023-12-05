[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```


## To run the data base in docker
1) install docker and docker-compose
2) after installing you need to run
```agsl
    sudo docker-compose -f db.yml up -d
```
3) Then the mongodb will be running in the localhost:27017
4) To stop the mongodb
```agsl
    sudo docker-compose -f db.yml down
```

## Adding .ENV variables
1) create a .env file in the root directory
2) add the following variables
```agsl
    PORT=3000
    MONGO_URL= {MONGODB_URL ALONG WIHT DB_NAME}
        (example: mongodb://localhost:27017/nest)
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## To Get Api Documentation
1) After running the app go to http://localhost:3000/api
2) You will get the swagger documentation

## Stay in touch

- Author - Anudeep Reddy
