#Mini-Carosel

## Description

implement a mini carosel

## How to run

To spin up a local development environment, run the following command:

```
docker-compose up -dev-deps
```

This will spin up a postgres database.

Run

```
yarn
```

to install all dependencies.

Then run

```
npx primsa migrate dev
```

to migrate the database.

Then run

```
yarn dev
```

## How to use

There is a simple UI to add a new carosel item. You can access it at http://localhost:3000/sliderManagement

To view the carosel, go to http://localhost:3000/
Select the carosel item you want to view.
By default the carosel will auto play.
