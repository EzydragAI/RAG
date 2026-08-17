"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function RagToggleLab() {
  const [mode, setMode] = useState<"closed" | "open">("closed");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={mode === "closed" ? "default" : "secondary"}
          onClick={() => setMode("closed")}
        >
          Without RAG
        </Button>
        <Button
          size="sm"
          variant={mode === "open" ? "success" : "secondary"}
          onClick={() => setMode("open")}
        >
          With RAG
        </Button>
      </div>
      <div className="example-box space-y-2 font-mono text-sm">
        <p className="text-slate-200">User: What is my PTO balance?</p>
        {mode === "closed" ? (
          <p className="text-red-400">
            LLM: I don&apos;t have access to your personal HR data.
          </p>
        ) : (
          <>
            <p className="text-sky-300">1. Retrieve: [User_John_HR_File.pdf]</p>
            <p className="text-sky-300">2. Stuff the file into the prompt.</p>
            <p className="font-bold text-emerald-400">
              3. LLM: John, you have 15 days of PTO remaining.
            </p>
          </>
        )}
      </div>
      <p className={cn("text-sm", mode === "open" ? "text-emerald-400" : "text-amber-400")}>
        {mode === "closed"
          ? "Closed-book: the model can only guess from training data."
          : "Open-book: retrieval grounds the answer in a real HR document."}
      </p>
    </div>
  );
}
