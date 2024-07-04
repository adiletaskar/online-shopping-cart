# online-shopping-cart application

This is a mini-project for an online store, where there is a catalog of goods. You can add items to the cart, remove them from the cart, and calculate the total cost.

# Technology Stack 

React + Bootstrap + json-server
## Features

- Store items in localStorage
- Using react contex


## Run Locally

Clone the project

```bash
  git clone https://github.com/adiletaskar/online-shopping-cart
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the backend server

```bash
  json-server --watch db.json
```

Start frontend

```bash
  npm run dev
```
## API Reference

#### Get all items

```http
  GET /items
```

#### Get item

```http
  GET /items/${id}
```


