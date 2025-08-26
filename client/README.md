# GrubDash Client (React)

A React front end for the GrubDash demo app. It renders the UI and talks to the API server in `../server`.

## Table of Contents

* [Features](#features)
* [Prerequisites](#prerequisites)
* [Quick Start (Monorepo)](#quick-start-monorepo)
* [Installation (Client only)](#installation-client-only)
* [Configuration](#configuration)
* [Running the App](#running-the-app)
* [Production Build](#production-build)
* [Project Structure](#project-structure)
* [Attribution & License](#attribution--license)

## Features

* Browse items, add to cart, and place orders (demo UI)
* Responsive layout (desktop/tablet/mobile)
* Configurable API base URL via environment variable

## Prerequisites

* Node.js ≥ 18
* A running API server from `../server` (examples below use port **5005**)

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

> If your API runs on port 5000 instead, set `REACT_APP_API_BASE_URL=http://localhost:5000`.

## Installation (Client only)

```bash
cd client
npm install
```

## Configuration

Create a `.env` file in the **client** root.
**Create React App only injects variables starting with `REACT_APP_`.**

```env
# Example: API on port 5005
REACT_APP_API_BASE_URL=http://localhost:5005

# Or, if your API uses the default 5000:
# REACT_APP_API_BASE_URL=http://localhost:5000
```

> After editing `.env`, stop and restart `npm start` for changes to take effect.

## Running the App

```bash
npm start
```

The app runs at [http://localhost:3000](http://localhost:3000) and sends all API requests to `REACT_APP_API_BASE_URL`.

## Production Build

```bash
npm run build
# (optional) preview locally:
npx serve -s build
```

## Project Structure

```
client/
  public/           # static assets incl. index.html
  src/              # React source
    components/     # reusable UI components
    utils/          # helpers (e.g., API utilities)
```

## Attribution & License

This client is adapted from the Thinkful starter template:

* Original template: [https://github.com/Thinkful-Ed/starter-grub-dash-front-end](https://github.com/Thinkful-Ed/starter-grub-dash-front-end)

Upstream code remains under its original license (see the upstream LICENSE).
Modifications in this folder follow the same license unless otherwise noted.
Maintainer: **Ying Zhou (Ying-Fiona-Zhou)**.
