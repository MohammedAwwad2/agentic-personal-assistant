import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { VectorRepository } from "../repositories/VectorRepository.js";
import { config } from "../config/index.js";

export class IngestionService {
  constructor(vectorRepository = new VectorRepository()) {
    this.vectorRepository = vectorRepository;
  }

  async ingestFile(filePath) {
    const loader = new PDFLoader(filePath);
    const docs = await loader.load();

    const { chunkSize, chunkOverlap, batchSize } = config.ingestion;
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize,
      chunkOverlap,
    });
    const chunks = await splitter.splitDocuments(docs);

    for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize);
      await this.vectorRepository.addDocuments(batch);
    }

    console.log("✅ Ingestion Complete!");
  }
}
