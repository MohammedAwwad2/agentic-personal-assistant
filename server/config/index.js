import "dotenv/config";

export const config = {
  server: {
    port: process.env.PORT || 3000,
  },
  gemenai: {
    apiKey: process.env.GEMENI_API_KEY,
    model: "gemini-2.5-flash",
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
