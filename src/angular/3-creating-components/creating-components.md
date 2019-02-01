@page angular/creating-components Creating Components
@parent angular 3

@description Creating Our First Components

@body

## Overview

In this part, we will:

- Install precreated assets 
- Generate home and restaurant components
- Use pipes for image paths
- Write an interface to describe our restaurant data

### Adding Assets

To get our app up and running quicker so we can focus on the architecture, we'll import some pre-created styles and assets to save us time.

```shell
npm install place-my-order-assets@0.1 --save
```

Open the ``angular.json`` file, and make the following changes to include these files in our build process. This will copy the images into our assets directory for when we serve our application.

```typescript
...
"assets": [
    "src/favicon.ico",
    "src/assets",
    {
        "glob": "**/*",
        "input": "./node_modules/place-my-order-assets/images/",
        "output": "./assets/images"
    }
],
"styles": [
    "src/styles.less",
    "./node_modules/place-my-order-assets/less/styles.less"
],
```

### Creating components

Let's begin to build out the main views of our app. We'll need a home view, and restaurant list page to show all the restaurants we can order from. In Angular, Components are the basic building blocks that help us craft the UI. They are classes that handle views, allow management of user interaction, and displaying information via data binding. Data binding is the term for connecting data or information to the UI. An example would be an input field that a user enters a value into.

Recommended reading: <a href="https://angular.io/guide/lifecycle-hooks" target="_blank" >Angular Lifecyle Hooks</a>

```shell
ng g component home
ng g component restaurant
```

This will create two new components for us and import them in our root module.

```code
├── src/
|   ├── app/
|   |   ├── home/
|   |       |── home.component.ts
|   |       |── home.component.spec.ts
|   |       |── home.component.less
|   |       |── home.component.html
|   |   ├── restaurant/
|   |       |── restaurant.component.ts
|   |       |── restaurant.component.spec.ts
|   |       |── restaurant.component.less
|   |       |── restaurant.component.html
```

Update the `home.component.html` file to be:

__src/app/home/home.component.html__

```html
<div class="homepage">
  <img src="./assets/images/homepage-hero.jpg" alt="Restaurant table with glasses." width="250" height="380" />
  <h1>Ordering food has never been easier</h1>
  <p>
    We make it easier than ever to order gourmet food
    from your favorite local restaurants.
  </p>
  <p>
     <a class="btn" routerLink="/restaurants" role="button">Choose a Restaurant</a>
  </p>
</div>
```

Update the `restaurant.component.html` file to be:

__src/app/restaurant/restaurant.component.html__

```html
<div class="restaurants">
  <h2 class="page-header">Restaurants</h2>
  <div class="restaurant loading" *ngIf="restaurants.isPending"></div>
  <ng-container *ngIf="restaurants.value.length">
    <div class="restaurant" *ngFor="let restaurant of restaurants.value">

      <img src="{{restaurant.images.thumbnail | imageUrl}}" width="100" height="100">
      <h3>{{restaurant.name}}</h3>

      <div class="address" *ngIf="restaurant.address">
        {{restaurant.address.street}}<br />{{restaurant.address.city}}, {{restaurant.address.state}} {{restaurant.address.zip}}
      </div>

      <div class="hours-price">
        $$$<br />
        Hours: M-F 10am-11pm
        <span class="open-now">Open Now</span>
      </div>

      <a class="btn" [routerLink]="['/restaurants', restaurant.slug]">
        Details
      </a>
      <br />
    </div>
  </ng-container>
</div>

```

#### > DETOUR! Pipes in Angular

We're using an API in this demo that wasn't built for our exact purposes, and we need a different image path for our app to serve. <a href="https://angular.io/guide/pipes" target="_blank">Angular Pipes</a> come in handy to transform content in our templates. We'll create a pipe to help handle our image pathing:

```bash
ng g pipe imageUrl
```

In our newly created `image-url.pipe.ts' update the code to be:

__src/app/image-url.pipe.ts__

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  transform(value: any): any {
    return value.replace('node_modules/place-my-order-assets', './assets');
  }
}
```

This pipe is called in the markup we added to our html page as:

```html
  <img src="{{restaurant.images.thumbnail | imageUrl}}" width="100" height="100">
  ```

#### END DETOUR

Back to our main restaurant component, in the ``restaurant.component.ts`` file:

__src/app/restaurant/restaurant.component.ts__

```typescript
import { Component, OnInit } from '@angular/core';

interface Item {
    name: string;
    price: number;
}
interface Menu {
    lunch: Array<Item>;
    dinner: Array<Item>;
}

interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
}

interface Images {
    thumbnail: string;
    owner: string;
    banner: string;
}

export interface Restaurant {
    name: string;
    slug: string;
    images: Images;
    menu: Menu;
    address: Address;
    _id: string;
}
  
export interface Data<T> {
  value: Array<T>;
  isPending: boolean;
}

@Component({
  selector: 'pmo-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.less']
})
export class RestaurantComponent implements OnInit {
  public restaurants: Data<Restaurant> = {
    value: [],
    isPending: false
  }

  constructor() { }

  ngOnInit() {
  }

}
```

We'll come back to this view to feed in data, but for now you'll notice we're using interfaces to help define what our data will look like.