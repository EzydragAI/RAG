import Link from "next/link";
import { ArrowRight, Clock, Keyboard, Presentation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MODULES, PHASES } from "@/content/modules";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.12),transparent_35%),radial-gradient(circle_at_85%_80%,rgba(129,140,248,0.1),transparent_40%)]" />
      <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
        <p className="text-sm font-semibold tracking-[0.25em] text-sky-400 uppercase">
          One-hour classroom
        </p>
        <h1 className="mt-4 max-w-4xl text-5xl leading-tight font-bold text-white md:text-7xl">
          Deep Dive into RAG
        </h1>
        <p className="mt-6 max-w-2xl text-xl text-slate-400">
          Mastering Retrieval-Augmented Generation — from core concepts to advanced architectures, with diagrams you can step through and labs you can play live.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button asChild size="lg">
            <Link href="/learn">
              Start class
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/quiz">Jump to quiz</Link>
          </Button>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <Info icon={Clock} title="60 minutes" body="Timed agenda so you can pace a live session." />
          <Info icon={Keyboard} title="Presenter keys" body="Arrows / Space to move. F for fullscreen." />
          <Info icon={Presentation} title="Live labs" body="Chunking, cosine, PII, hybrid search, GraphRAG, routing." />
        </div>
        <div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {PHASES.map((phase) => (
            <div key={phase.id} className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-xs text-sky-400">{phase.time}</p>
              <p className="mt-1 font-semibold text-white">{phase.label}</p>
              <p className="mt-2 text-sm text-slate-500">
                {MODULES.filter((item) => item.phase === phase.id && item.kind === "lesson").length} topics
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function Info({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Clock;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <Icon className="mt-0.5 size-5 text-sky-400" />
      <div>
        <p className="font-semibold text-white">{title}</p>
        <p className="text-sm text-slate-400">{body}</p>
      </div>
    </div>
  );
}
