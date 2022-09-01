## Techstack : 

Node js with Nest js
MongoDB as database

## Pre-requisites : 
- Node.js
- MongoDB setup 
## Setup : 

- Create a .env file in root directory and pass the following env vars :

```
SECRET_KEY=${secret key for token}
MONGO_URI=${YOUR_DB_URL}
```

- To install the dependencies of project
```bash
$ npm install
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
