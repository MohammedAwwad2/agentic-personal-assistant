import "dotenv/config";

export const config = {
  server: {
    port: process.env.PORT || 3001,
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-4o",
    temperature: 0,
  },
  pinecone: {
    apiKey: process.env.PINECONE_API_KEY,
    index: process.env.PINECONE_INDEX,
    embeddingModel: "llama-text-embed-v2",
  },
  langsmith: {
    tracing: process.env.LANGSMITH_TRACING === "true",
    endpoint: process.env.LANGSMITH_ENDPOINT,
    apiKey: process.env.LANGSMITH_API_KEY,
    project: process.env.LANGSMITH_PROJECT,
  },
  upload: {
    maxFileSize: 25 * 1024 * 1024,
    allowedTypes: ["application/pdf"],
    allowedExtensions: [".pdf"],
  },
  ingestion: {
    chunkSize: 1000,
    chunkOverlap: 200,
    batchSize: 96,
  },
};
