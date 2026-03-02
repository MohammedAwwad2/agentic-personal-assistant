import { tool } from "langchain";
import { z } from "zod";

export const createSearchTool = (vectorRepository) => {
  return tool(
    async ({ query }) => {
      console.log(`🔍 Agent is searching for: "${query}"`);

      const results = await vectorRepository.search(query, 10);

      results.forEach((r, i) => {
        console.log(`Result ${i + 1}:`, r.pageContent.slice(0, 200));
      });

      if (results.length === 0) {
        return "No relevant information found in the knowledge base.";
      }

      return results.map((doc) => doc.pageContent).join("\n\n---\n\n");
    },
    {
      name: "search_knowledge_base",
      description:
        "Searches the internal knowledge base for technical info and documentation. Use this when you need to find information from uploaded PDF documents.",
      schema: z.object({
        query: z.string().describe("The search query to look up in the knowledge base"),
      }),
    }
  );
};

export const searchKnowledgeBase = createSearchTool;
