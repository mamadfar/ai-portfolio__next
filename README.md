# AI Portfolio

A modern, interactive portfolio website powered by AI that showcases my work and provides an intelligent chatbot experience for visitors.

Link to my [AI Portfolio](https://mamadfar.dev)

## 🚀 Features

- **AI-Powered Chat**: Interactive chatbot that can answer questions about my experience, skills, and projects
- **Modern UI**: Beautiful, responsive design with dark/light theme support
- **Vector Search**: Intelligent document retrieval using AstraDB vector database
- **Real-time Chat**: Streaming responses with chat history and Redis caching
- **Fast Performance**: Built with Next.js 15 and Turbopack for optimal speed

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS v4
- **AI/ML**: 
  - OpenAI API for language model
  - LangChain for AI orchestration
  - Vector embeddings for semantic search
- **Database**: AstraDB (Cassandra) for vector storage
- **Caching**: Upstash Redis for chat history and response caching
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- OpenAI API key
- AstraDB database
- Upstash Redis instance

### Installation

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

Add your API keys (`.env.example`):
```env
OPENAI_API_KEY=your_openai_api_key
ASTRA_DB_APPLICATION_TOKEN=your_astra_db_token
ASTRA_DB_ID=your_astra_db_id
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 🤖 AI Features

The AI chatbot can:
- Answer questions about my professional experience
- Provide details about my projects and skills
- Discuss my technical expertise
- Maintain conversation context across messages
- Search through portfolio content using vector similarity

---

Built with ❤️ using Next.js and AI

