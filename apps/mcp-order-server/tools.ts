import { tool } from "ai";
import { z } from "zod";
import { fetchGuitars } from "./apis";

// server tool - used by server to provide the list of products
// must have an execute function that returns a promise
export const getProducts = tool({
  description: "Get all products from the database",
  parameters: z.object({}),
  execute: async () => {
    console.log("Using get products tool");
    return await fetchGuitars();
  },
});

// client tool - used by UI or client to provide the id of the guitar to recommend
export const recommendGuitar = tool({
  description: "Use this tool to recommend a guitar to the user",
  parameters: z.object({
    id: z.string().describe("The id of the guitar to recommend"),
  }),
});

export type MCPClient = {
  tools: any;
};

export default async function getTools(mcpClient: MCPClient) {
  const tools = await mcpClient.tools();
  return {
    ...tools,
    getProducts,
    recommendGuitar,
  };
}
