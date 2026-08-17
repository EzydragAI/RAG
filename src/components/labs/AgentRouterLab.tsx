"use client";

import { useState } from "react";
import { AgentRouterDiagram } from "@/components/diagrams/AgentRouterDiagram";
import { Button } from "@/components/ui/button";

const QUERIES = [
  { text: "What is our Q3 revenue?", tool: "sql" as const },
  { text: "Who won the game last night?", tool: "web" as const },
  { text: "How does the HR vacation policy work?", tool: "vector" as const },
];

export function AgentRouterLab() {
  const [active, setActive] = useState<(typeof QUERIES)[number] | null>(null);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {QUERIES.map((query) => (
          <Button
            key={query.text}
            size="sm"
            variant={active?.text === query.text ? "default" : "secondary"}
            onClick={() => setActive(query)}
          >
            {query.text}
          </Button>
        ))}
      </div>
      <AgentRouterDiagram active={active?.tool ?? null} />
      {active && (
        <p className="text-sm text-emerald-400">
          Router chose <strong className="uppercase">{active.tool}</strong> for “{active.text}”
        </p>
      )}
    </div>
  );
}
