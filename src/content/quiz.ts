export type QuizQuestion = {
  id: number;
  prompt: string;
  options: [string, string, string];
  answer: 0 | 1 | 2;
  explanation: string;
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    prompt: "What is the primary purpose of a Vector Database in RAG?",
    options: [
      "To train the LLM on new data",
      "To generate the final text response",
      "To store and query numerical embeddings",
    ],
    answer: 2,
    explanation:
      "Vector databases store embeddings and retrieve nearest neighbors. They do not train the model or write the final answer.",
  },
  {
    id: 2,
    prompt: "Which mathematical formula measures the angular distance between vectors?",
    options: ["Cosine Similarity", "Pythagorean Theorem", "Tangent Variance"],
    answer: 0,
    explanation:
      "Cosine similarity is the cosine of the angle between two vectors. A small angle means a strong semantic match.",
  },
  {
    id: 3,
    prompt: 'Why do we use "Chunk Overlap" when prepping data?',
    options: [
      "To prevent cutting sentences in half and losing context",
      "Because Vector DBs cannot store long text",
      "To encrypt sensitive data",
    ],
    answer: 0,
    explanation:
      "Overlap copies the tail of chunk A onto the start of chunk B so a split sentence or idea still survives retrieval.",
  },
  {
    id: 4,
    prompt: "What role does LangChain typically play?",
    options: [
      "It replaces the Vector DB",
      "It is a specialized embedding model",
      "It orchestrates the retrieval and prompt pipeline",
    ],
    answer: 2,
    explanation:
      "Orchestrators stitch loaders, retrievers, prompts, and the LLM together. They are glue, not the database or the embedder.",
  },
  {
    id: 5,
    prompt: "How does the LLM receive the retrieved data?",
    options: [
      "By fine-tuning its weights",
      "Via context stuffing (putting chunks into the prompt)",
      "Through a direct database ping",
    ],
    answer: 1,
    explanation:
      "The retriever’s chunks are concatenated into the prompt. The model never queries the database itself. This is context stuffing, not a security exploit.",
  },
  {
    id: 6,
    prompt: "What does a Cross-Encoder do in a RAG funnel?",
    options: [
      "Deeply re-ranks retrieved documents for higher precision",
      "Translates text to another language",
      "Speeds up the initial database search",
    ],
    answer: 0,
    explanation:
      "A cross-encoder reads the query and each candidate together and scores true relevance. It is slower, so it only reranks a shortlist.",
  },
  {
    id: 7,
    prompt: "What is GraphRAG designed to solve?",
    options: [
      "Creating charts for UI",
      "Encrypting databases",
      "Answering global questions by tracking entity relationships",
    ],
    answer: 2,
    explanation:
      "Vectors fetch isolated snippets. GraphRAG walks people, places, and concepts so the model can answer theme-level questions.",
  },
  {
    id: 8,
    prompt: 'If a user asks "How do I fix it?", what advanced technique is needed?',
    options: ["Semantic Caching", "Query Reformulation", "PII Masking"],
    answer: 1,
    explanation:
      "The follow-up is underspecified. A small model rewrites it using chat history, e.g. “How do I fix Error 404 on the login page?”",
  },
  {
    id: 9,
    prompt: "What trade-off is most common when adding advanced Reranking?",
    options: [
      "Latency vs Accuracy",
      "Security vs Usability",
      "Storage Space vs Cost",
    ],
    answer: 0,
    explanation:
      "Cross-encoders and graph hops raise wait time and API cost, but they usually raise answer quality.",
  },
  {
    id: 10,
    prompt: 'In RAG evaluation (like RAGAS), what does "Faithfulness" measure?',
    options: [
      "If the user trusts the AI",
      "If the DB returned the right document",
      "If the LLM avoided making up facts outside the context",
    ],
    answer: 2,
    explanation:
      "Faithfulness checks that the answer stays inside the retrieved context. Context precision is the metric for “did we fetch the right doc?”",
  },
];
