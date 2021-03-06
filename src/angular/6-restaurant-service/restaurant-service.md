@page angular/restaurant-service Writing a Restaurant Service
@parent angular 6

@description Writing a Restaurant Service

@body

## Overview

In this part, we will:

- Install the place-my-order API
- Create a proxy to serve the API
- Update `npm start` script
- Generate a new service via the CLI
- Write a method to make an http request

## Installing the Place My Order API

We've done some work to create a Place My Order API for use in this app.

```bash
npm install place-my-order-api@1 --save
```

Next make add an api script to your ``package.json``

```js
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e",
    "api": "place-my-order-api --port 7070"
  }
```
@highlight 8

Double check the api is working by running ``npm run api`` and navigating to <a href="http://localhost:7070/restaurants" target="\_blank">localhost:7070/restaurants</a>. You should see a JSON list of restaurant data. It will be helpful to have a second terminal tab to run the api command from.


## Create a Proxy to Serve API

Next, we'll create a <a href="https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md" target="_blank">proxy</a> file at the root of our Angular project to access our API for local development purposes.

```bash
touch proxy.conf.json
```

```js
{
  "/api": {
    "target": "http://localhost:7070",
    "secure": false,
    "pathRewrite": {
      "^/api": ""
    },
    "logLevel": "debug",
    "changeOrigin": true
  }
}
```

Update the package.json `npm start` script to be `ng serve --proxy-config proxy.conf.json`

```js
"scripts": {
  "ng": "ng",
  "start": "ng serve --proxy-config proxy.conf.json",
  "build": "ng build",
  "test": "ng test",
  "lint": "ng lint",
  "e2e": "ng e2e",
  "api": "place-my-order-api --port 7070"
},
```
@highlight 3

Now, restart our app using `npm start` and it will run it with the proxy config we created. To test that it's working, navigate to <a href="http://localhost:4200/api/restaurants" target="_blank">http://localhost:4200/api/restaurants</a> and you should be able to see a list of restaurants.

## Importing `HttpClientModule` into _app.module.ts_

For making HTTP requests to interact with an API, Angular provides a HttpClient Module. To use it we'll need to import it in the root module of our app and include it the imports array.

__src/app/app.module.ts__

@sourceref ./app.module.ts
@highlight 3,21


We're going to write interfaces to tell Typescript what we expect a restaurant and other related objects to look like. We'll create a new file to house these.

```bash
ng g interface restaurant/restaurant
```

__src/app/restaurant/restaurant.ts__

@sourceref ./restaurant.ts

Now that we have our interface defined, we'll create a Service to handle getting our restaurant data. Services are classes with narrow purposes that don't typically involve view-related functionality.

```bash
ng g service restaurant/restaurant
```

In our newly created service file, we'll need to import HttpClient.

__src/app/restaurant/restaurant.service.ts__

@sourceref ./restaurant.service.ts
@highlight 2, 4, 6-8, 15, 17-19

In the next step we'll call the `getRestaurants` method in our component to get the list of restaurants.
