export type PhaseId = "intro" | "beginners" | "builders" | "assess";

export type LessonModule = {
  id: string;
  title: string;
  phase: PhaseId;
  minutes: number;
  kind: "section" | "lesson";
  summary: string;
};

export const CLASS_MINUTES = 60;

export const PHASES: Array<{
  id: PhaseId;
  label: string;
  time: string;
}> = [
  { id: "intro", label: "Orientation", time: "0–8 min" },
  { id: "beginners", label: "Phase 1: Beginners", time: "8–28 min" },
  { id: "builders", label: "Phase 2: Builders", time: "28–53 min" },
  { id: "assess", label: "Assessment", time: "53–60 min" },
];

export const MODULES: LessonModule[] = [
  {
    id: "what-is-rag",
    title: "What is RAG?",
    phase: "intro",
    minutes: 5,
    kind: "lesson",
    summary: "Why LLMs hallucinate, and how retrieval turns generation into an open-book test.",
  },
  {
    id: "iceberg",
    title: "The RAG Iceberg",
    phase: "intro",
    minutes: 3,
    kind: "lesson",
    summary: "A prototype is the tip. Production RAG lives below the waterline.",
  },
  {
    id: "phase-1",
    title: "Phase 1: Beginners",
    phase: "beginners",
    minutes: 0,
    kind: "section",
    summary: "The tip of the iceberg. Setting up the fundamental data retrieval pipeline.",
  },
  {
    id: "chunking",
    title: "The Art of Chunking",
    phase: "beginners",
    minutes: 8,
    kind: "lesson",
    summary: "Break documents into pieces the model can actually read — without destroying meaning.",
  },
  {
    id: "embeddings",
    title: "Vector Embeddings & Similarity",
    phase: "beginners",
    minutes: 7,
    kind: "lesson",
    summary: "Text becomes numbers. Cosine similarity finds the nearest meaning, not the nearest keyword.",
  },
  {
    id: "generation",
    title: "The Generation Engine",
    phase: "beginners",
    minutes: 5,
    kind: "lesson",
    summary: "Retrieved chunks are stuffed into a prompt with guardrails. That is how the LLM “reads.”",
  },
  {
    id: "phase-2",
    title: "Phase 2: RAG for Builders",
    phase: "builders",
    minutes: 0,
    kind: "section",
    summary: "Diving below the surface. Turning a fragile prototype into a production system.",
  },
  {
    id: "security",
    title: "Security & PII Masking",
    phase: "builders",
    minutes: 4,
    kind: "lesson",
    summary: "Scrub names, phones, and secrets before anything is embedded or sent to an LLM.",
  },
  {
    id: "retrieval",
    title: "Query Reformulation & Multi-Hop",
    phase: "builders",
    minutes: 5,
    kind: "lesson",
    summary: "Vague follow-ups get rewritten. Complex questions are answered in hops.",
  },
  {
    id: "reranking",
    title: "Reranking (The Funnel)",
    phase: "builders",
    minutes: 4,
    kind: "lesson",
    summary: "A fast bi-encoder casts a wide net. A cross-encoder keeps only the best three chunks.",
  },
  {
    id: "graphrag",
    title: "Beyond Vectors: GraphRAG",
    phase: "builders",
    minutes: 4,
    kind: "lesson",
    summary: "Knowledge graphs answer global questions vectors miss by walking entity relationships.",
  },
  {
    id: "hybrid",
    title: "Hybrid Search",
    phase: "builders",
    minutes: 4,
    kind: "lesson",
    summary: "Blend BM25 exact match with dense vectors so Error ID-993A is not lost in synonyms.",
  },
  {
    id: "hnsw",
    title: "HNSW Indexing",
    phase: "builders",
    minutes: 3,
    kind: "lesson",
    summary: "Approximate nearest neighbor search jumps across graph highways, then walks local streets.",
  },
  {
    id: "agentic",
    title: "Agentic RAG & Routing",
    phase: "builders",
    minutes: 4,
    kind: "lesson",
    summary: "A router agent picks SQL, web search, or the vector store based on intent.",
  },
  {
    id: "evaluation",
    title: "Evaluation & Constraints",
    phase: "builders",
    minutes: 3,
    kind: "lesson",
    summary: "RAGAS measures precision and faithfulness. Caching trades cost and latency for speed.",
  },
  {
    id: "wrap",
    title: "Module Assessment",
    phase: "assess",
    minutes: 7,
    kind: "lesson",
    summary: "Ten questions covering the iceberg — from chunk overlap to faithfulness.",
  },
];

export function getModuleIndex(id: string) {
  return MODULES.findIndex((module) => module.id === id);
}
