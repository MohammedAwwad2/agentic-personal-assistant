import { PineconeStore } from "@langchain/pinecone";
import { PineconeEmbeddings } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { config } from "../config/index.js";

export class VectorRepository {
  constructor() {
    this.vectorStore = null;
  }

  async getVectorStore() {
    if (this.vectorStore) return this.vectorStore;

    const { apiKey, index, embeddingModel } = config.pinecone;

    if (!apiKey) {
      throw new Error("Missing PINECONE_API_KEY");
    }
    if (!index) {
      throw new Error("Missing PINECONE_INDEX");
    }

    const pc = new PineconeClient({ apiKey });
    const pineconeIndex = pc.Index(index);

    const embeddings = new PineconeEmbeddings({
      model: embeddingModel,
    });

    this.vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
    });

    return this.vectorStore;
  }

  async search(query, limit = 10) {
    const store = await this.getVectorStore();
    return await store.similaritySearch(query, limit);
  }

  async addDocuments(documents) {
    const store = await this.getVectorStore();
    return await store.addDocuments(documents);
  }
}
