"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { IcebergDiagram } from "@/components/diagrams/IcebergDiagram";
import { ChunkingDiagram } from "@/components/diagrams/ChunkingDiagram";
import { VectorDiagram } from "@/components/diagrams/VectorDiagram";
import { PromptDiagram } from "@/components/diagrams/PromptDiagram";
import { PiiDiagram } from "@/components/diagrams/PiiDiagram";
import { RerankFunnel } from "@/components/diagrams/RerankFunnel";
import { HybridSearchDiagram } from "@/components/diagrams/HybridSearchDiagram";
import { HnswDiagram } from "@/components/diagrams/HnswDiagram";
import { AgentRouterDiagram } from "@/components/diagrams/AgentRouterDiagram";
import { RagPipelineVisual } from "@/components/diagrams/RagPipelineVisual";
import { EvaluationVisual } from "@/components/diagrams/EvaluationVisual";
import { RetrievalVisual } from "@/components/diagrams/RetrievalVisual";
import { RagToggleLab } from "@/components/labs/RagToggleLab";
import { ChunkingLab } from "@/components/labs/ChunkingLab";
import { SimilarityLab } from "@/components/labs/SimilarityLab";
import { PromptBuilderLab } from "@/components/labs/PromptBuilderLab";
import { PiiLab } from "@/components/labs/PiiLab";
import { ReformulationLab } from "@/components/labs/ReformulationLab";
import { HybridSearchLab } from "@/components/labs/HybridSearchLab";
import { AgentRouterLab } from "@/components/labs/AgentRouterLab";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { LessonModule } from "@/content/modules";

const GraphRagFlow = dynamic(
  () => import("@/components/diagrams/GraphRagFlow").then((mod) => mod.GraphRagFlow),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[320px] items-center justify-center rounded-xl border border-slate-700 bg-slate-950 text-slate-500">
        Loading graph…
      </div>
    ),
  },
);

type LessonContentProps = {
  lesson: LessonModule;
  onNavigate: (id: string) => void;
};

export function LessonContent({ lesson, onNavigate }: LessonContentProps) {
  switch (lesson.id) {
    case "what-is-rag":
      return (
        <TwoCol
          left={
            <>
              <h2>The problem and the solution</h2>
              <p>
                Large Language Models have a knowledge cut-off and will <strong>hallucinate</strong> when asked about private, proprietary, or very recent data.
              </p>
              <p>
                <strong>RAG (Retrieval-Augmented Generation)</strong> is an open-book test. The system searches external documents first, then answers from those facts.
              </p>
              <p>
                Extra example: ask “What changed in yesterday’s on-call runbook?” A frozen model shrugs. RAG retrieves last night’s page and answers with a citation.
              </p>
            </>
          }
          right={
            <div className="space-y-4">
              <RagPipelineVisual />
              <Card>
                <CardContent>
                  <CardTitle className="mb-3">Try it: PTO question</CardTitle>
                  <RagToggleLab />
                </CardContent>
              </Card>
            </div>
          }
        />
      );
    case "iceberg":
      return (
        <TwoCol
          left={
            <>
              <h2>Prototype vs production</h2>
              <p>
                A basic RAG demo takes a few hours: load PDFs, dump chunks into a vector store, wrap LangChain around an LLM.
              </p>
              <p>
                That is the <strong>tip of the iceberg</strong>. Enterprise RAG needs chunk strategy, query rewriting, reranking, graphs, security, and evaluation.
              </p>
              <p>Click the iceberg to jump into that phase of class.</p>
            </>
          }
          right={
            <IcebergDiagram onSelect={onNavigate} />
          }
        />
      );
    case "phase-1":
      return (
        <SectionCard
          title="Phase 1: Beginners"
          body="The tip of the iceberg. We will build the fundamental pipeline: chunk → embed → retrieve → generate."
        />
      );
    case "chunking":
      return (
        <TwoCol
          left={
            <>
              <h2>Why we cut documents</h2>
              <p>
                Models have a context window. A 500-page manual cannot go into one prompt. <strong>Chunking</strong> breaks text into digestible pieces — and the cut points decide accuracy.
              </p>
              <ul>
                <li><strong>Fixed-size:</strong> every N tokens. Fast, but can bisect a sentence.</li>
                <li><strong>Semantic:</strong> split on paragraphs, headers, or sentences.</li>
                <li><strong>Overlap:</strong> copy the tail of chunk A onto chunk B so meaning survives the cut.</li>
              </ul>
              <p>Extra example: “do not share passwords over email” split across two chunks may retrieve only the first half.</p>
            </>
          }
          right={
            <div className="space-y-4">
              <ChunkingDiagram />
              <Card>
                <CardContent>
                  <CardTitle className="mb-3">Try it: slice the handbook</CardTitle>
                  <ChunkingLab />
                </CardContent>
              </Card>
            </div>
          }
        />
      );
    case "embeddings":
      return (
        <TwoCol
          left={
            <>
              <h2>Meaning as geometry</h2>
              <p>
                An embedding model (for example OpenAI <code>text-embedding-3-small</code>) turns each chunk into a dense array — often 768 to 1536 numbers.
              </p>
              <p>
                “Apple” the fruit and “Apple” the company land in different neighborhoods. Retrieval scores the <strong>cosine similarity</strong> between the query vector and each document vector.
              </p>
            </>
          }
          right={
            <div className="space-y-4">
              <VectorDiagram />
              <Card>
                <CardContent>
                  <CardTitle className="mb-3">Try it: drag the vectors</CardTitle>
                  <SimilarityLab />
                </CardContent>
              </Card>
            </div>
          }
        />
      );
    case "generation":
      return (
        <TwoCol
          left={
            <>
              <h2>How the model “reads”</h2>
              <p>
                The LLM never opens your PDF. An orchestrator (LangChain, LlamaIndex, or your own code) <strong>stuffs retrieved chunks into the prompt</strong> next to the user question.
              </p>
              <p>
                Classroom note: older slides call this “prompt injection.” In security, that phrase means an attack. Here we mean <strong>context stuffing</strong> — a legitimate technique — plus guardrails that say “answer only from context.”
              </p>
            </>
          }
          right={
            <div className="space-y-4">
              <PromptDiagram />
              <Card>
                <CardContent>
                  <CardTitle className="mb-3">Try it: build the mega-prompt</CardTitle>
                  <PromptBuilderLab />
                </CardContent>
              </Card>
            </div>
          }
        />
      );
    case "phase-2":
      return (
        <SectionCard
          title="Phase 2: RAG for Builders"
          body="Below the waterline: privacy, rewriting, reranking, graphs, hybrid search, indexes, and agents."
        />
      );
    case "security":
      return (
        <TwoCol
          left={
            <>
              <h2>Mask before you embed</h2>
              <p>
                Production RAG must protect people. <strong>PII</strong> is stripped before documents hit an external embedding API or LLM, for GDPR and HIPAA-style rules.
              </p>
            </>
          }
          right={
            <div className="space-y-4">
              <PiiDiagram />
              <Card>
                <CardContent>
                  <CardTitle className="mb-3">Try it: live redaction</CardTitle>
                  <PiiLab />
                </CardContent>
              </Card>
            </div>
          }
        />
      );
    case "retrieval":
      return (
        <div className="space-y-6">
          <TwoCol
            left={
              <>
                <h2>Rewrite, then hop</h2>
                <p>
                  Users ask vague follow-ups. A smaller LLM rewrites the query from chat history so the vector search has full context.
                </p>
                <p>
                  For multi-hop questions, retrieve a clue, form a new search, repeat until the answer is assembled — CEO of the company that makes the iPhone.
                </p>
              </>
            }
            right={<RetrievalVisual />}
          />
          <ReformulationLab />
        </div>
      );
    case "reranking":
      return (
        <TwoCol
          left={
            <>
              <h2>The funnel</h2>
              <p>
                Bi-encoders are fast because embeddings are precomputed, but the perfect chunk might sit at rank 45 of 100.
              </p>
              <ul>
                <li><strong>Broad net:</strong> vector DB returns the top 100.</li>
                <li><strong>Deep score:</strong> a cross-encoder reads query + chunk together.</li>
                <li><strong>Refined output:</strong> only the top 3 reach the LLM.</li>
              </ul>
            </>
          }
          right={<RerankFunnel />}
        />
      );
    case "graphrag":
      return (
        <TwoCol
          left={
            <>
              <h2>When snippets are not enough</h2>
              <p>
                “Summarize the main themes of the whole corpus” fails with vanilla RAG because vectors fetch isolated islands of text.
              </p>
              <p>
                <strong>GraphRAG</strong> extracts entities and relationships, then walks the web. Click a node on the graph.
              </p>
            </>
          }
          right={<GraphRagFlow />}
        />
      );
    case "hybrid":
      return (
        <TwoCol
          left={
            <>
              <h2>Meaning plus exact match</h2>
              <p>
                Dense vectors understand “fix” ≈ “troubleshoot” but often miss <strong>Error ID-993A</strong>. BM25 does the reverse.
              </p>
              <p>
                Hybrid search runs both, then blends ranks with Reciprocal Rank Fusion.
              </p>
              <HybridSearchDiagram />
            </>
          }
          right={
            <Card>
              <CardContent>
                <CardTitle className="mb-3">Try it: fuse the ranks</CardTitle>
                <HybridSearchLab />
              </CardContent>
            </Card>
          }
        />
      );
    case "hnsw":
      return (
        <TwoCol
          left={
            <>
              <h2>Why search is milliseconds, not minutes</h2>
              <p>
                Comparing a query to 10 million chunks one-by-one is too slow. Vector DBs use Approximate Nearest Neighbor. The industry default is <strong>HNSW</strong> — Hierarchical Navigable Small World graphs.
              </p>
              <ul>
                <li>Top layer: sparse highways for long jumps.</li>
                <li>Bottom layer: dense local streets for precision.</li>
              </ul>
            </>
          }
          right={<HnswDiagram />}
        />
      );
    case "agentic":
      return (
        <TwoCol
          left={
            <>
              <h2>Not every question belongs in a vector DB</h2>
              <p>
                “What’s the weather?” should not search HR PDFs. An <strong>agentic router</strong> inspects intent and picks a tool: SQL, web, or standard RAG.
              </p>
            </>
          }
          right={
            <div className="space-y-4">
              <AgentRouterDiagram />
              <Card>
                <CardContent>
                  <CardTitle className="mb-3">Try it: route the query</CardTitle>
                  <AgentRouterLab />
                </CardContent>
              </Card>
            </div>
          }
        />
      );
    case "evaluation":
      return (
        <TwoCol
          left={
            <>
              <h2>RAGAS: two pillars</h2>
              <ul>
                <li>
                  <strong>Context precision</strong> — did the database fetch the right document?
                </li>
                <li>
                  <strong>Faithfulness</strong> — did the LLM invent facts outside that context?
                </li>
              </ul>
              <div className="example-box text-sm">
                <p>Context: “PTO remaining: 15 days.”</p>
                <p className="text-red-400">Unfaithful: “You have 20 days and a bonus trip.”</p>
                <p className="text-emerald-400">Faithful: “You have 15 days of PTO remaining.”</p>
              </div>
              <p>
                Cross-encoders and graph walks raise wait time and API spend. <strong>Semantic caching</strong> stores prior answers and serves repeats instantly.
              </p>
            </>
          }
          right={<EvaluationVisual />}
        />
      );
    case "wrap":
      return (
        <SectionCard
          title="Module Assessment"
          body="Ten questions covering the iceberg. Use the quiz live with the class — answers and explanations appear after each choice."
        >
          <Button asChild size="lg">
            <Link href="/quiz">Start the 10-question quiz</Link>
          </Button>
        </SectionCard>
      );
    default:
      return null;
  }
}

function TwoCol({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="grid items-start gap-8 xl:grid-cols-2">
      <div className="prose-lesson space-y-4 text-[17px] leading-relaxed text-slate-300 [&_code]:rounded [&_code]:bg-slate-800 [&_code]:px-1 [&_code]:text-sky-300 [&_h2]:font-[family-name:var(--font-display)] [&_h2]:text-2xl [&_h2]:text-white [&_li]:ml-4 [&_li]:list-disc [&_strong]:text-white">
        {left}
      </div>
      <div>{right}</div>
    </div>
  );
}

function SectionCard({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <div className="mb-6 h-1.5 w-24 rounded-full bg-sky-400" />
      <h2 className="text-4xl font-bold text-white md:text-5xl">{title}</h2>
      <p className="mt-4 max-w-2xl text-lg text-slate-400">{body}</p>
      {children && <div className="mt-8">{children}</div>}
    </div>
  );
}
