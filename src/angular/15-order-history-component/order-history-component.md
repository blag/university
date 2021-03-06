@page angular/order-history-component Order History Component
@parent angular 15

@description Writing the Order History Component
@body

## Overview

In this part, we will:

- Create a new order history component
- Get all orders from our order service
- Create a child component to handle different states of orders
- Create ways to update and delete orders in the view
- Add order history link to our main navigation

## Creating Order History Component

```bash
ng g component order/history
```
## Add Order History Route

### The problem

Create a new route `/order-history` that shows the history component you created. 

### What you need to know

- how to create a route

---

### The solution

__src/app/app-routing.module.ts__

@sourceref ./app-routing.module.ts
@highlight 8, 27-30


## Adding Order History to Main Navigation

### The Problem

Next, add the order history path you created to the navigation in the `src/app/app.component.html` file.

### What you need to know

- How to create a link to a route

---

### The solution

__src/app/app.component.html__

@sourceref ./app.component.html
@highlight 11-13

You should now be able to navigate to <a href="http://localhost:4200/order-history" target="_blank">http://localhost:4200/order-history</a> and see a list of all orders. 

### The problem

In this component, we want to see a history of all orders. Import the order service into this new component and make the call to get all orders.

__src/app/order/history.component.ts__

@sourceref ./history.component.ts

### What you need to know

- how to import a service
- how to subscribe to a method on a service 

---

### The solution

__src/app/order/history.component.ts__

@sourceref ./history.component-solution.ts
@highlight 2, 22, 31-35


__src/app/order/history.component.html__

@sourceref ./history.component-1.html

## Creating a Child Component to Handle Order States

Orders can have states of new, preparing, delivery, and delivered, and we want to have different actions to take in the UI based on an orders status. Let's refactor the UI displaying all the orders into a new component. This new component will take a variety of different inputs: 
- orders: an array of orders based on status property
- listTitle: "NewOrders"/"Preparing"/"Out for Delivery"/"Delivery"
- status: "new"/"preparing"/"delivery"/"delivered"
- statusTitle: "New Order!"/"Preparing"/"Out for delivery"/"Delivered"
- action: "preparing"/"delivery"/"delivered"
- actionTitle: "preparing"/"Out for delivery"/"Delivered"
- emptyMessage: "No new orders"/"No orders preparing"/"No orders are being delivered"/"No delivered orders"

```bash
ng g component order/list
```

The markup will look like this:

__src/app/order/list.component.html__

@sourceref ./list.component.html

### The Problem

Update this component to:
- take the above list of inputs
- have three methods
  - `markAs(order, action)` that will update an order based on the action
  - `delete(order._id)` that will delete an order
  - `total(items)` that will return the order total
- have an `isPending` member that gets set before and after actions are performed
  
You'll need to import `Input` from angular core, as well as `OrderService` and relevant interfaces to handle updating and deleting your orders.

### What you need to know

- set inputs on a component
- call methods on a service
- update a boolean member to show/hide content
  
---

### The solution

__src/app/order/list.component.ts__

@sourceref ./list.component.ts
@highlight 6

### The problem

Refactor your `src/app/order/history.component.html` file to use the new list component for each order subgroup: new orders, preparing orders, delivery orders, delivered orders.


### What you need to know

- How to pass properties to child components

---

### The solution

__src/app/order/history.component.html__

@sourceref ./history.component.html


Now as you click the actions of the orders and refresh the page, you can see their updated statuses. Next we'll use Socket.io to capture the events and instantly update the ui.
