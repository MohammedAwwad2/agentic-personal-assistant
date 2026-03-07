# Agentic Personal Assistant

A full-stack agentic RAG (Retrieval-Augmented Generation) application that allows users to upload PDF documents and chat with them using an intelligent AI agent.

## Features

* PDF Document Ingestion: Upload and process PDF files into a vector database
* Agentic Chat: Intelligent agent that decides when to search the knowledge base
* Conversation Memory: Maintains context across multiple questions
* Modern UI: Chat-like interface with file upload capabilities
* Observability: Integrated with LangSmith for monitoring and tracing

## Architecture

### Backend (Node.js/Express)

* Server: Express.js API server with CORS and file upload support
* Agent: LangChain ReAct agent
* Vector Database: Pinecone for document storage and similarity search
* Embeddings: Pinecone-hosted `llama-text-embed-v2` model
* Observability: LangSmith for tracing and monitoring

### Frontend (React/Vite)

* UI Framework: React with Vite for fast development
* Styling: Chat-like dark theme interface
* File Upload: Drag-and-drop PDF upload with progress feedback
* Chat Interface: Real-time messaging with typing indicators

## Prerequisites

* Node.js (v18 or higher)
* npm or yarn
* Pinecone account with index created
* Google API key (`GOOGLE_API_KEY`)
* LangSmith account (optional, for observability)

## Setup

1. Clone the repository

```bash
git clone <repository-url>
cd agentic-personal-assistant
```

2. Install dependencies

```bash
npm install
```

3. Environment Configuration

```bash
cp .env.example .env
```

Edit `.env` with your API keys:

```env
# LLM
GOOGLE_API_KEY=your_google_api_key

# Vector DB (Pinecone)
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX=your_pinecone_index_name

# LangSmith tracing
LANGSMITH_TRACING=true
LANGSMITH_ENDPOINT=https://api.smith.langchain.com
LANGSMITH_API_KEY=langsmith_key
LANGSMITH_PROJECT="Project name"
```

## Running the Application

### Development Mode

```bash
npm run dev
```

This starts both the server (port 3001) and client (port 5173) concurrently.

### Individual Services

```bash
# Server only
npm run dev:server

# Client only  
npm run dev:client
```

## How It Works

### Document Ingestion

1. User uploads PDF via frontend
2. Server receives file and extracts text using PDFLoader
3. Text is split into chunks (1000 chars with 200 overlap)
4. Chunks are converted to embeddings using Pinecone's model
5. Embeddings are stored in Pinecone vector database

### Chat Flow

1. User sends a message
2. Agent receives message with conversation history
3. Agent decides whether to search the knowledge base
4. If needed, searches Pinecone for relevant document chunks
5. Agent uses retrieved context to generate response
6. Response is sent back to user and added to conversation history

## Key Components

### Agent

* ReAct agent using LangChain's `createAgent`
* MemorySaver for conversation persistence
* Tool calling for knowledge base search

### Search Tool

* Pinecone vector store integration
* Similarity search with top-k results
* Lazy initialization for environment variables

### Ingestion Pipeline

* PDF text extraction and chunking
* Batch processing (96 chunks per API call)
* Pinecone upsert operations

### Frontend

* React state management for chat and upload
* File upload with progress feedback
* Real-time chat interface with auto-scroll

## Troubleshooting

### Common Issues

1. Connection Refused Error

   * Ensure server is running on port 3001
   * Check for port conflicts: `lsof -i :3001`

2. Environment Variables Missing

   * Verify `.env` file exists in server directory
   * Check all required API keys are set

3. Pinecone API Errors

   * Verify Pinecone index exists
   * Check API key permissions
   * Ensure embedding model matches ingestion/retrieval

4. Dependency Installation Errors

   * Use `--legacy-peer-deps` flag for peer dependency conflicts
   * Clear node_modules and reinstall if needed

## Technologies Used

* Backend: Node.js, Express.js, Multer
* Frontend: React, Vite
* AI/ML: LangChain
* Vector DB: Pinecone
* Observability: LangSmith
* Development: Concurrently, ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License

