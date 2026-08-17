"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type Doc = {
  id: string;
  title: string;
  text: string;
  keyword: number;
  vector: number;
};

const DOCS: Doc[] = [
  {
    id: "a",
    title: "Login runbook",
    text: "Fix Error ID-993A by clearing cookies and signing in with SSO.",
    keyword: 0.98,
    vector: 0.55,
  },
  {
    id: "b",
    title: "General troubleshooting",
    text: "How to fix login problems and recover a stuck session.",
    keyword: 0.2,
    vector: 0.91,
  },
  {
    id: "c",
    title: "Vacation policy",
    text: "Employees accrue 15 vacation days per year.",
    keyword: 0.05,
    vector: 0.12,
  },
  {
    id: "d",
    title: "Error catalog",
    text: "ID-993A: expired session token on the auth gateway.",
    keyword: 0.88,
    vector: 0.4,
  },
];

function rrf(rank: number) {
  return 1 / (60 + rank);
}

export function HybridSearchLab() {
  const [query, setQuery] = useState("Fix Error ID-993A");

  const ranked = useMemo(() => {
    const keywordBoost = query.toUpperCase().includes("993A") ? 1 : 0.3;
    const vectorBoost =
      /fix|troubleshoot|login/i.test(query) ? 1 : 0.4;

    const scored = DOCS.map((doc) => ({
      ...doc,
      k: doc.keyword * keywordBoost,
      v: doc.vector * vectorBoost,
    }));

    const byKeyword = [...scored].sort((a, b) => b.k - a.k);
    const byVector = [...scored].sort((a, b) => b.v - a.v);

    return scored
      .map((doc) => {
        const kRank = byKeyword.findIndex((item) => item.id === doc.id) + 1;
        const vRank = byVector.findIndex((item) => item.id === doc.id) + 1;
        return {
          ...doc,
          kRank,
          vRank,
          fused: rrf(kRank) + rrf(vRank),
        };
      })
      .sort((a, b) => b.fused - a.fused);
  }, [query]);

  return (
    <div className="space-y-3">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-sky-400"
      />
      <div className="overflow-hidden rounded-xl border border-slate-700">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-sky-400">
            <tr>
              <th className="px-3 py-2">Document</th>
              <th className="px-3 py-2">Keyword rank</th>
              <th className="px-3 py-2">Vector rank</th>
              <th className="px-3 py-2">RRF fused</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((doc, index) => (
              <tr
                key={doc.id}
                className={cn(
                  "border-t border-slate-800",
                  index === 0 ? "bg-emerald-500/10 text-emerald-300" : "text-slate-300",
                )}
              >
                <td className="px-3 py-2">
                  <div className="font-semibold">{doc.title}</div>
                  <div className="text-slate-500">{doc.text}</div>
                </td>
                <td className="px-3 py-2">{doc.kRank}</td>
                <td className="px-3 py-2">{doc.vRank}</td>
                <td className="px-3 py-2 font-mono">{doc.fused.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
