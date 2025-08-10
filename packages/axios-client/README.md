# Axios Client Package

This package provides an Axios-based API client and an Express server that demonstrates how to use the client to communicate with another Express server.

## Features

- **ApiClient**: A wrapper around Axios with convenient methods for HTTP requests
- **Express Server**: A server that uses the ApiClient to proxy requests to another server

## Structure

```
src/
├── client.ts      # ApiClient class
├── server.ts      # Express server that uses ApiClient
└── index.ts       # Main entry point
```

## Usage

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Package

```bash
npm run build
```

### 3. Start the Server

```bash
npm start
```

The server will run on port 3001 by default.

### 4. Using the ApiClient

```typescript
import { ApiClient } from "./src/client";

const client = new ApiClient("http://localhost:3000");

// Make requests
const health = await client.get("/api/health");
const data = await client.post("/api/data", { name: "John", value: "123" });
```

## API Endpoints

The Express server provides the following endpoints:

- `GET /health` - Health check for the axios-client server
- `GET /api/proxy/health` - Proxy to express-server health endpoint
- `GET /api/proxy/data` - Proxy to express-server data endpoint
- `POST /api/proxy/data` - Proxy to express-server data endpoint
- `PUT /api/proxy/data` - Proxy to express-server data endpoint

## Configuration

- **Port**: Set via `PORT` environment variable (default: 3001)
- **Target Server**: The ApiClient is configured to call `http://localhost:3000` by default

## Development

```bash
npm run dev
```

This will build and start the server in development mode.
