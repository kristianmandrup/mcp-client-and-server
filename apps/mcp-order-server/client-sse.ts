import { experimental_createMCPClient, generateText, streamText } from "ai";
import { getProducts, recommendGuitar } from "./tools";
import { anthropic } from "@ai-sdk/anthropic";

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

export interface Message {
  id?: string;
  role: "user" | "assistant";
  content: string;
}

const messages: Message[] = [
  {
    role: "user",
    content: "Hello, I'm looking for a guitar. Can you recommend one?",
  },
];

const SYSTEM_PROMPT = `You are an AI for a music store.

There are products available for purchase. You can recommend a product to the user.
You can get a list of products by using the getProducts tool.

You also have access to a fulfillment server that can be used to purchase products.
You can get a list of products by using the getInventory tool.
You can purchase a product by using the purchase tool.

After purchasing a product tell the customer they've made a great choice and their order will be processed soon and they will be playing their new guitar in no time.
`;

const tools = await getTools();
// print tools
console.log(Object.keys(tools));
const prompt = "Find me a LED guitar that is in stock";
try {
  const result = await generateText({
    model: anthropic("claude-3-5-sonnet-latest"),
    system: SYSTEM_PROMPT,
    tools,
    prompt,
    maxSteps: 20,
  });
  console.log(result.text);
  messages.push({ role: "assistant", content: result.text });
  console.log({ messages });
} catch (error) {
  console.error("Error in AI Response:", error);
  //   if (NoSuchToolError.isInstance(error)) {
  //     // handle the no such tool error
  //   } else if (InvalidToolArgumentsError.isInstance(error)) {
  //     // handle the invalid tool arguments error
  //   } else if (ToolExecutionError.isInstance(error)) {
  //     // handle the tool execution error
  //   }
  //   else {
  //     // handle other errors
  //   }
}

// try {
//   const result = streamText({
//     model: anthropic("claude-3-5-sonnet-latest"),
//     messages,
//     system: SYSTEM_PROMPT,
//     maxSteps: 20,
//     tools,
//   });

//   const resp = result.toDataStreamResponse();
//   console.log("Response:", resp);
//   const txt = await resp.text();
//   console.log("Txt:", txt);
//   // return resp;
// } catch (error) {
//   console.error("Error in AI Response:", error);
//   if (error instanceof Error && error.message.includes("rate limit")) {
//     const errMsg = JSON.stringify({
//       error: "Rate limit exceeded. Please try again in a moment.",
//     });
//     // return new Response(errMsg, { status: 429 });
//   }
// }
