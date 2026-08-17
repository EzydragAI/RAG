"use client";

import { useMemo, useState } from "react";
import { chunkFixed, chunkSemantic, SAMPLE_POLICY } from "@/lib/chunking";
import { cn } from "@/lib/utils";

const COLORS = ["border-sky-400", "border-emerald-400", "border-amber-400", "border-violet-400"];

export function ChunkingLab() {
  const [text, setText] = useState(SAMPLE_POLICY);
  const [size, setSize] = useState(140);
  const [overlap, setOverlap] = useState(40);
  const [mode, setMode] = useState<"fixed" | "semantic">("fixed");

  const chunks = useMemo(
    () => (mode === "fixed" ? chunkFixed(text, size, overlap) : chunkSemantic(text)),
    [mode, overlap, size, text],
  );

  return (
    <div className="space-y-3">
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        className="h-28 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm text-slate-200 outline-none focus:border-sky-400"
      />
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold",
            mode === "fixed" ? "bg-sky-400 text-slate-950" : "bg-slate-800 text-slate-300",
          )}
          onClick={() => setMode("fixed")}
        >
          Fixed-size
        </button>
        <button
          type="button"
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold",
            mode === "semantic" ? "bg-sky-400 text-slate-950" : "bg-slate-800 text-slate-300",
          )}
          onClick={() => setMode("semantic")}
        >
          Semantic
        </button>
      </div>
      {mode === "fixed" && (
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-xs text-slate-400">
            Chunk size: {size} chars
            <input
              type="range"
              min={60}
              max={280}
              value={size}
              onChange={(event) => setSize(Number(event.target.value))}
              className="mt-1 w-full accent-sky-400"
            />
          </label>
          <label className="text-xs text-slate-400">
            Overlap: {overlap} chars
            <input
              type="range"
              min={0}
              max={120}
              value={overlap}
              onChange={(event) => setOverlap(Number(event.target.value))}
              className="mt-1 w-full accent-emerald-400"
            />
          </label>
        </div>
      )}
      <div className="grid max-h-56 gap-2 overflow-auto pr-1">
        {chunks.map((chunk, index) => (
          <div
            key={`${chunk.start}-${chunk.end}`}
            className={cn(
              "rounded-lg border bg-slate-950/80 p-2 text-xs leading-relaxed text-slate-300",
              COLORS[index % COLORS.length],
            )}
          >
            <div className="mb-1 font-semibold text-slate-100">
              Chunk {index + 1} · chars {chunk.start}–{chunk.end}
            </div>
            {chunk.text}
          </div>
        ))}
      </div>
    </div>
  );
}
