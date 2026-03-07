import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { createAgent } from "langchain";
import { MemorySaver } from "@langchain/langgraph-checkpoint";
import { createSearchTool } from "../utils/tools.js";
import { config } from "../config/index.js";

export class AgentService {
  constructor(vectorRepository) {
    this.vectorRepository = vectorRepository;
    this.checkpointer = new MemorySaver();
    this.agent = null;
  }

  async getAgent() {
    if (this.agent) return this.agent;

    const { model, temperature } = config.gemenai;
    const modelInstance = new ChatGoogleGenerativeAI({
      model,
      temperature,
    });

    this.agent = createAgent({
      model: modelInstance,
      tools: [createSearchTool(this.vectorRepository)],
      checkpointer: this.checkpointer,
      systemPrompt: `You are a helpful AI assistant with access to a knowledge base. When users ask questions,
         search the knowledge base using the available tools to find relevant information. Be concise and accurate.`,
    });

    return this.agent;
  }

  async run({ sessionId = "default", message }) {
    const agent = await this.getAgent();

    console.log(`🤖 Running agent for: "${message}"`);

    const response = await agent.invoke(
      {
        messages: [{ role: "user", content: message }],
      },
      {
        configurable: {
          thread_id: sessionId,
        },
      }
    );

    const lastMessage = response.messages[response.messages.length - 1];
    const output = lastMessage?.content || "";

    console.log(`✅ Agent response: ${output.slice(0, 100)}...`);

    return { output };
  }
}
