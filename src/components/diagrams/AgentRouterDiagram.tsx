"use client";

import { motion } from "motion/react";
import { ExplainerPlayer, FlowDot, GlowPulse } from "@/components/diagrams/ExplainerPlayer";
import { useScenePlayer } from "@/lib/use-scene-player";

const TOOLS = [
  { id: "sql", label: "SQL Database", detail: "Q3 revenue = $4M", y: 48, color: "#10B981" },
  { id: "vector", label: "Vector Database", detail: "HR policy RAG", y: 148, color: "#F59E0B" },
  { id: "web", label: "Web Search API", detail: "Last night’s game", y: 248, color: "#8B5CF6" },
] as const;

type ToolId = (typeof TOOLS)[number]["id"];

export function AgentRouterDiagram({ active }: { active?: ToolId | null }) {
  const player = useScenePlayer(4, 2200);
  const autoTool: ToolId | null =
    player.scene === 1 ? "sql" : player.scene === 2 ? "vector" : player.scene === 3 ? "web" : null;
  const chosen = active === undefined ? autoTool : active;
  const standalone = active === undefined;

  const scene = standalone ? player.scene : chosen ? 1 : 0;
  const captions = [
    "Not every question belongs in a vector database.",
    "Revenue? Route to SQL.",
    "HR policy? Route to standard RAG.",
    "Last night’s game? Route to the live web.",
  ];

  const inner = (
    <svg viewBox="0 0 640 360" className="absolute inset-0 h-full w-full">
      <rect x="24" y="148" width="110" height="70" rx="14" fill="#1E293B" stroke="#F8FAFC" strokeWidth="2" />
      <text x="79" y="178" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontWeight="700">
        Query
      </text>
      <text x="79" y="198" textAnchor="middle" fill="#94A3B8" fontSize="11">
        intent?
      </text>
      <path d="M 134 183 H 176" className="flow-line" stroke="#94A3B8" strokeWidth="3" fill="none" />
      <FlowDot from={[134, 183]} to={[176, 183]} color="#38BDF8" />

      <GlowPulse cx="230" cy="183" color="#38BDF8" r={42} />
      <circle cx="230" cy="183" r="44" fill="#0F172A" stroke="#38BDF8" strokeWidth="4" />
      <motion.circle
        cx="230"
        cy="183"
        r="50"
        fill="none"
        stroke="#38BDF8"
        strokeDasharray="6 8"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "230px 183px" }}
      />
      <text x="230" y="178" textAnchor="middle" fill="#38BDF8" fontSize="14" fontWeight="700">
        LLM
      </text>
      <text x="230" y="198" textAnchor="middle" fill="#38BDF8" fontSize="14" fontWeight="700">
        Router
      </text>

      <path d="M 274 160 Q 310 82 360 82" fill="none" stroke="#10B981" strokeWidth="3" strokeDasharray="6" opacity={!chosen || chosen === "sql" ? 1 : 0.15} />
      <path d="M 274 183 H 360" fill="none" stroke="#F59E0B" strokeWidth="3" strokeDasharray="6" opacity={!chosen || chosen === "vector" ? 1 : 0.15} />
      <path d="M 274 206 Q 310 282 360 282" fill="none" stroke="#8B5CF6" strokeWidth="3" strokeDasharray="6" opacity={!chosen || chosen === "web" ? 1 : 0.15} />

      {chosen === "sql" && <FlowDot from={[274, 160]} to={[360, 82]} color="#10B981" />}
      {chosen === "vector" && <FlowDot from={[274, 183]} to={[360, 183]} color="#F59E0B" />}
      {chosen === "web" && <FlowDot from={[274, 206]} to={[360, 282]} color="#8B5CF6" />}

      {TOOLS.map((tool) => (
        <motion.g key={tool.id} animate={{ opacity: !chosen || chosen === tool.id ? 1 : 0.22 }}>
          <rect x="360" y={tool.y} width="240" height="72" rx="12" fill="#0F172A" stroke={tool.color} strokeWidth="2.5" />
          <text x="480" y={tool.y + 30} textAnchor="middle" fill="#F8FAFC" fontSize="16" fontWeight="700">
            {tool.label}
          </text>
          <text x="480" y={tool.y + 52} textAnchor="middle" fill="#94A3B8" fontSize="12">
            {tool.detail}
          </text>
        </motion.g>
      ))}
    </svg>
  );

  if (!standalone) {
    return (
      <div className="relative aspect-[16/11] overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
        {inner}
      </div>
    );
  }

  return (
    <ExplainerPlayer
      scene={scene}
      count={4}
      playing={player.playing}
      caption={captions[scene]}
      labels={["Decide", "SQL", "RAG", "Web"]}
      onPlay={player.play}
      onPause={player.pause}
      onReplay={player.replay}
      onSeek={player.setScene}
    >
      {inner}
    </ExplainerPlayer>
  );
}
