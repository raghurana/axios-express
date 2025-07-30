# Axios Express Workspace

This is an npm workspace containing two TypeScript packages:

- **axios-client**: A TypeScript-based HTTP client using Axios
- **express-server**: A TypeScript-based Express.js server

## Project Structure

```
axios-express/
├── package.json                 # Root workspace configuration
├── tsconfig.json               # Base TypeScript configuration
├── packages/
│   ├── axios-client/
│   │   ├── package.json        # Axios client package
│   │   ├── tsconfig.json       # TypeScript config
│   │   └── src/
│   │       └── index.ts        # Axios client implementation
│   └── express-server/
│       ├── package.json        # Express server package
│       ├── tsconfig.json       # TypeScript config
│       └── src/
│           └── index.ts        # Express server implementation
└── README.md                   # This file
```

## Getting Started

### Installation

```bash
npm install
```

This will install dependencies for all packages in the workspace.

### Development

#### Run both packages simultaneously:

```bash
npm run dev
```

#### Run packages individually:

**Express Server:**

```bash
npm run dev:server
# or
npm run dev --workspace=express-server
```

**Axios Client:**

```bash
npm run dev:client
# or
npm run dev --workspace=axios-client
```

### Building

Build all packages:

```bash
npm run build
```

Build individual packages:

```bash
npm run build --workspace=axios-client
npm run build --workspace=express-server
```

### Cleaning

Clean all build artifacts:

```bash
npm run clean
```

## Package Details

### axios-client

A TypeScript HTTP client using Axios with:

- Generic type support for API responses
- Configurable base URL and timeout
- Support for GET, POST, PUT, DELETE methods
- Built-in error handling

**Usage:**

```typescript
import { ApiClient } from "axios-client";

const client = new ApiClient("http://localhost:3000");
const data = await client.get("/api/health");
```

### express-server

A TypeScript Express.js server with:

- CORS enabled
- JSON body parsing
- Health check endpoint (`/api/health`)
- Example API endpoints (`/api/data`)
- Error handling middleware
- TypeScript request/response types

**Available endpoints:**

- `GET /api/health` - Health check
- `GET /api/data` - Example data endpoint
- `POST /api/data` - Example POST endpoint

## Development Features

- **TypeScript**: Full TypeScript support with strict mode
- **tsx**: Fast TypeScript execution with `--inspect` flag for debugging
- **Hot Reload**: Development scripts use tsx for fast reloading
- **Workspace Management**: Centralized dependency management
- **Debug Support**: Both packages run with Node.js inspector enabled

## Scripts

| Script               | Description                                    |
| -------------------- | ---------------------------------------------- |
| `npm run dev`        | Run both server and client in development mode |
| `npm run dev:server` | Run only the Express server                    |
| `npm run dev:client` | Run only the Axios client                      |
| `npm run build`      | Build all packages                             |
| `npm run clean`      | Clean build artifacts from all packages        |
