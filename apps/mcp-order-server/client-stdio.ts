import { experimental_createMCPClient } from "ai";
import { getProducts, recommendGuitar } from "./tools";
import { Experimental_StdioMCPTransport as StdioMCPTransport } from "ai/mcp-stdio";
import { get } from "http";

const mcpClient = await experimental_createMCPClient({
  transport: new StdioMCPTransport({
    command: "node",
    args: ["stdio-server.js"],
  }),
  name: "Order Service",
});

export default async function getTools() {
  const tools = await mcpClient.tools();
  return {
    ...tools,
    getProducts,
    recommendGuitar,
  };
}

console.log(
  "Getting tools from MCP Stdio Server running in a separate process"
);
getTools().then((tools) => {
  console.log(tools);
});
