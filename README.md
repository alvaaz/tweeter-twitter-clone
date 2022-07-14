# Tweeter clone

## How to get up and running without docker-compose

To start using browser-sync, you need to run the following command:

```bash
yarn start
```

This will start the server.

You need open another tab in your terminal and run the following command:

```bash
yarn ui
```

This will allow you to see the UI and get changes live.

## How to get up and running using docker-compose

Once you've cloned the project to your host we can now start our project.

```bash
docker-compose build && docker-compose up
```

## Database access

To access the database we need to run the following command:

```bash
docker exec -it mongo bash
```

```bash
mongo
```

```bash
use mydb
```

Change session and server

```bash
mongodb://mongo/mydb
```

Uso con browsersync

Browsersync tiene el parámetro --proxy para enlazar con el server levantado con nodemon y pasarlo por browsersync al puerto 3001. Por eso docker-compose expone sólo el puerto 3001.
