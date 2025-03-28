import { tool } from "ai";
import { z } from "zod";

import { fetchGuitars } from "./apis";

export const getProducts = tool({
  description: "Get all products from the database",
  parameters: z.object({}),
  execute: async () => await fetchGuitars(),
});

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
