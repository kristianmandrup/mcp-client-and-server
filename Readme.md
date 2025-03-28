# Tanstack Chat App with MCP servers

A guitar web shop that exposes a ChatGPT powered Chat App and an MCP powered fulfillment API.

![TanStack Chat App with MCP servers](https://user-images.githubusercontent.com/10210425/235512470-c1a8f3f1-f9c0-4f2a-a1c7-d2e2f0a0e0c8.png)

## Getting Started

To run this application:

```bash
pnpm install
pnpm dev
```

You should see

```bash
Fulfillment API Server is running on port http://localhost:8080
Products API Server is running on port http://localhost:8082
...
  ➜ Local:    http://localhost:3001/
  ➜ Network:  use --host to expose
  ➜ Local:    http://localhost:3000/
  ➜ Network:  use --host to expose
```

Start the MCP server

```bash
cd apps/mcp-order-server
node sse-server.js
```

You should see

```bashß
MCP SSE Server is running on http://localhost:8081/sse
```

## .env Updates

Add an `.env` file to the root of the project with the following content:

```env
ANTHROPIC_API_KEY=your_anthropic_api_key
```

## Building For Production

To build this application for production:

```bash
pnpm build
```

## Testing

This project uses [Vitest](https://vitest.dev/) for testing.
