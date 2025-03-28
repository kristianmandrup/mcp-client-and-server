# MCP Order Server

This is a simple server that simulates an MCP order server. It is used to demonstrate how to integrate an MCP server with a ChatGPT powered Chat App.

## MCP Servers

The MCP order server supports two transport protocols: `Stdio` and `SSE`.

### Stdio server

Runs the server in a separate process and receives messages in stdin and sends responses in stdout.

To run it:

```bash
node stdio-server.js
```

### SSE server

Uses Server-Sent Events (SSE) to receive and send messages.

To run it:

```bash
node sse-server.js
```

## MCP Clients

### Stdio client

Uses Stdio to interact with the server running in a separate process and receives the response in stdout.

```bash
bun client-stdio.ts
```

```bash
Getting tools from MCP Stdio Server running in a separate process
{
  getOrders: {
    description: "Get product orders",
    parameters: {
      ...
    },
  },
  {
    ...
  },
}
```

### SSE client

Uses Server-Sent Events (SSE) to interact with the server.

```bash
bun client-sse.ts
```

You should see

```bash
Getting tools from MCP SSE Server running on http://localhost:8081/sse
{
  getOrders: {
    description: "Get product orders",
    parameters: {
      ...
    },
  },
  {
    ...
  },
}
```
