# Tweeter clone

This project is a clone of [Twitter](https://twitter.com). It is a simple project to learn how to use [NodeJS](https://nodejs.org) and [Express](https://expressjs.com) to create a simple web application. This app is using [Docker](https://www.docker.com) and [docker-compose](https://docs.docker.com/compose/overview/) to create a containerized application.

### Dependencies

- [NodeJS](https://nodejs.org)
- [Express](https://expressjs.com)
- [MongoDB](https://www.mongodb.com)
- [Mongoose](https://mongoosejs.com)
- [Passport](https://www.passportjs.org)
- [TailwindCSS](https://tailwindcss.com)

### Features

- Login with Google or Email
- Create, retweet, like tweets
- Follow users
- View your profile
- View other profiles
- View your feed
- View other feeds
- View your followers
- View your following
- View your favorites
- View your retweets

### Install

This project is dockerized and can be installed with the following command:

```sh
docker-compose build && docker-compose up
```

You'll need install dependencies locally to have all types of dependencies.

```sh
yarn install
```

### Getting started

Try to reach the login page with the following url:

```sh
localhost:3001
```

This app uses [Browsersync](https://browsersync.io/) to automatically reload the page when a change is made. Browsersync has set up a --proxy to forward the requests to the localhost:3001. Docker-compose exposes port 3001 to the localhost as well.

### Database access

To access the database you need to run the following command while in the container:

```sh
docker exec -it mongo bash
```

```sh
mongo
```

```sh
use mydb
```
