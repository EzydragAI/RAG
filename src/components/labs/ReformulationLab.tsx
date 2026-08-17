"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const TURNS = [
  {
    user: "The login page shows Error 404.",
    assistant: "That usually means the route or session endpoint is missing.",
  },
  {
    user: "How do I fix it?",
    reformulated: "How do I fix the Error 404 on the login page?",
  },
];

const HOPS = [
  { label: "Question", text: "Who is the CEO of the company that makes the iPhone?" },
  { label: "Hop 1", text: "Retrieve: Apple makes the iPhone." },
  { label: "Hop 2", text: "New search: Who is the CEO of Apple? → Tim Cook." },
];

export function ReformulationLab() {
  const [showRewrite, setShowRewrite] = useState(false);
  const [hop, setHop] = useState(0);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="space-y-3">
        <p className="text-sm font-semibold text-sky-400">Query reformulation</p>
        <div className="space-y-2 rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm">
          <p className="text-slate-400">History: {TURNS[0].user}</p>
          <p className="text-slate-200">User: {TURNS[1].user}</p>
          {showRewrite && (
            <p className="font-semibold text-emerald-400">
              Rewritten: {TURNS[1].reformulated}
            </p>
          )}
        </div>
        <Button size="sm" onClick={() => setShowRewrite(true)}>
          Rewrite with chat history
        </Button>
      </div>
      <div className="space-y-3">
        <p className="text-sm font-semibold text-sky-400">Multi-hop retrieval</p>
        <div className="space-y-2">
          {HOPS.slice(0, hop + 1).map((item) => (
            <div key={item.label} className="example-box">
              <p className="text-xs font-semibold text-amber-400">{item.label}</p>
              <p className="font-mono text-sm text-sky-200">{item.text}</p>
            </div>
          ))}
        </div>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setHop((value) => Math.min(HOPS.length - 1, value + 1))}
        >
          Next hop
        </Button>
      </div>
    </div>
  );
}
