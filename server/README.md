# GrubDash Server (Express API)

An Express-based REST API that powers the GrubDash demo front end.

## Table of Contents

* [Prerequisites](#prerequisites)
* [Quick Start (Monorepo)](#quick-start-monorepo)
* [Installation (Server only)](#installation-server-only)
* [Configuration](#configuration)
* [Run Scripts](#run-scripts)
* [API Reference](#api-reference)
* [CORS](#cors)
* [Project Structure](#project-structure)
* [Troubleshooting](#troubleshooting)
* [Attribution & License](#attribution--license)

## Prerequisites

* Node.js ≥ 18

## Quick Start (Monorepo)

From the repo root `grubdash/`:

```bash
# Terminal A – start API (server)
cd server
PORT=5005 npm start      # -> http://localhost:5005

# Terminal B – start client
cd ../client
echo "REACT_APP_API_BASE_URL=http://localhost:5005" > .env
npm start                # -> http://localhost:3000
```

## Installation (Server only)

```bash
cd server
npm install
```

## Configuration

* **PORT**: HTTP port for the API (default `5000`).

  ```bash
  PORT=5005 npm start
  ```

## Run Scripts

Defined in `server/package.json`:

```json
{
  "scripts": {
    "start": "node src/server.js",
    "start:5005": "PORT=5005 node src/server.js",
    "dev": "PORT=5005 nodemon src/server.js",
    "test": "jest"
  }
}
```

Common usage:

```bash
npm run start:5005   # start on port 5005
npm run dev          # start with nodemon (auto-restart)
```

## API Reference

Base URL: `http://localhost:<PORT>` (examples below assume `PORT=5005`).

### GET /dishes

List all dishes.

```bash
curl http://localhost:5005/dishes
```

**200 OK**

```json
[
  { "id": "1", "name": "Spaghetti", "price": 1200, "description": "..." },
  { "id": "2", "name": "Pizza", "price": 1500, "description": "..." }
]
```

### GET /orders

List all orders.

```bash
curl http://localhost:5005/orders
```

**200 OK**

```json
[
  { "id": "A1", "deliverTo": "123 Main St", "status": "pending", "dishes": [/*...*/] }
]
```

### POST /orders

Create a new order.

```bash
curl -X POST http://localhost:5005/orders \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "deliverTo": "123 Main St",
      "mobileNumber": "555-555-5555",
      "status": "pending",
      "dishes": [
        { "id": "1", "quantity": 2 }
      ]
    }
  }'
```

**201 Created** with the created order.

### GET /orders/\:orderId

Fetch a single order.

```bash
curl http://localhost:5005/orders/A1
```

### PUT /orders/\:orderId

Update an order (e.g., address, dishes, or status).

```bash
curl -X PUT http://localhost:5005/orders/A1 \
  -H "Content-Type: application/json" \
  -d '{ "data": { "status": "preparing" } }'
```

### DELETE /orders/\:orderId

Delete an order (typically allowed only when `status` is `pending`).

```bash
curl -X DELETE http://localhost:5005/orders/A1
```

> **Notes**
>
> * Request/response bodies use a `{ "data": ... }` envelope.
> * Validation and error responses follow the error handler’s shape:
>
>   ```json
>   { "error": "Message explaining what went wrong" }
>   ```

## CORS

CORS is enabled globally in `src/app.js`:

```js
const cors = require("cors");
app.use(cors());
```

This allows requests from the client dev server ([http://localhost:3000](http://localhost:3000) or 3001).
If you prefer a whitelist during development:

```js
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001"] }));
app.options("*", cors());
```

## Project Structure

```
server/
  src/
    app.js               # Express app (CORS, JSON, routers, error handlers)
    server.js            # Entry point (reads PORT and starts the server)
    dishes/              # /dishes routes & controller
    orders/              # /orders routes & controller
    errors/              # notFound + errorHandler
    utils/               # helpers
```

## Troubleshooting

* **Port already in use**

  ```bash
  lsof -iTCP:5005 -sTCP:LISTEN -n -P
  kill -9 <PID>
  PORT=5005 npm start
  ```
* **Client shows “Failed to fetch”**

  * Ensure API is running (visit `http://localhost:5005/dishes`).
  * In `client/.env`, set `REACT_APP_API_BASE_URL=http://localhost:5005` and **restart** `npm start`.
  * Keep `app.use(cors())` enabled.

## Attribution & License

This server is part of the GrubDash learning project.
Upstream concepts/routes are adapted from Thinkful course material.
Your modifications follow the same license as the upstream unless otherwise noted.
