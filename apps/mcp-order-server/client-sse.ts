import { experimental_createMCPClient } from "ai";
import { getProducts, recommendGuitar } from "./tools";

const mcpClient = await experimental_createMCPClient({
  transport: {
    type: "sse",
    url: "http://localhost:8081/sse",
    // optional: configure HTTP headers, e.g. for authentication
    // headers: {
    //     Authorization: 'Bearer my-api-key',
    //   },
  },
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
  "Getting tools from MCP SSE Server running on http://localhost:8081/sse"
);
getTools().then((tools) => {
  console.log(tools);
});
