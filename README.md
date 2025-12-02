# MERN stack Note app

### *Check out the live app [here!](https://mern-notes.azurewebsites.net/)* 
(server might spin down due to inactivity, please wait a minute after the first request)

## Overview

A full-stack note-taking application built with the MERN stack **(MongoDB, Express.js, React, Node.js)**. Features user authentication with JWT, responsive design for all devices, and real-time CRUD operations. Users can securely create, edit and delete notes with a clean, modern interface that works seamlessly on desktop and mobile.

## Features
- **Authorization**: registration and login with **JWT**
- **Responsive Design**: Clean, modern UI with **Tailwind CSS**
- **CRUD notes**: Create, read, update, and delete notes in real-time

## Tech Stack
- **Frontend**: React, Tailwind CSS, Vite, Daisy-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Caching & Rate Limiting**: Redis Upstash
- **Authentication**: JWT

## Getting Started

Follow these steps to run the MERN Notes app locally on your machine.

### 1. Clone the repository
### 2. Install dependencies

All dependencies for backend and frontend are installed via root `build` script:

```bash
npm run build
```

This will:

* Install backend dependencies (`backend/package.json`)
* Install frontend dependencies (`frontend/package.json`)
* Build the frontend production bundle

---

### 3. Set environment variables

Create a `.env` file in the **backend** folder with the following variables:

```env
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
UPSTASH_REDIS_REST_URL=your-upstash-redis-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-redis-token
```
>This is for **Step 4**, so the application serves static files.
>Skip to **Step 4.1** for Development mode
```env
NODE_ENV=production
```
---

### 4. Start the server

Run the backend (which also serves the frontend build):

```bash
npm run start
```

By default, the server listens on `http://localhost:5000`.

### 4.1. Development mode 
Live reloads for both front and back-ends!
```bash
cd backend
npm run dev
```
In separate terminal instance
```bash
cd frontend
npm run dev
```

Vite will output the localhost link