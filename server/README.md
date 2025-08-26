# Grub_Dash_Front_End

A React front-end for a fictional food delivery app, adapted for personal learning and practice.

* Repo: [https://github.com/Ying-Fiona-Zhou/Grub\_Dash\_Front\_End](https://github.com/Ying-Fiona-Zhou/Grub_Dash_Front_End)

## Table of Contents

* [Features](#features)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Environment Variables (important)](#environment-variables-important)
* [Running the App](#running-the-app)
* [Production Build](#production-build)
* [Project Structure](#project-structure)
* [Contributing](#contributing)
* [Attribution & License](#attribution--license)

## Features

* Browse items, add to cart, and place orders (UI only).
* Responsive layout.
* REST API integration via a configurable base URL.

## Prerequisites

* **Node.js ≥ 18** (older `react-scripts` can use Node 16).
* Recommended: **`react-scripts@5.0.1`**.

## Installation

```bash
git clone https://github.com/Ying-Fiona-Zhou/Grub_Dash_Front_End.git
cd Grub_Dash_Front_End
npm install
```

## Environment Variables (important)

Create a `.env` file in the project root (Create React App only injects variables starting with `REACT_APP_`):

```env
REACT_APP_API_BASE_URL=http://localhost:5000
```

> Restart `npm start` after editing `.env`.

## Running the App

```bash
npm start
```

Dev server at [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
npx serve -s build
```

## Project Structure

```
public/           # static assets incl. index.html
src/              # React source
  components/     # reusable UI components
  utils/          # helper functions
```

## Contributing

PRs and issues are welcome (docs, accessibility, tests). Please keep upstream attribution.

## Attribution & License

Adapted from:

* Original template: [https://github.com/Thinkful-Ed/starter-grub-dash-front-end](https://github.com/Thinkful-Ed/starter-grub-dash-front-end)

Upstream code remains under its **original license** (see upstream LICENSE).
Your modifications in this repo are provided under the **same license**, unless otherwise noted.
**Credit:** Adapted and maintained by **Ying Zhou (Ying-Fiona-Zhou)**.
