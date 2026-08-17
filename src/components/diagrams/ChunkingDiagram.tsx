"use client";

import { motion } from "motion/react";
import { ExplainerPlayer, FlowDot } from "@/components/diagrams/ExplainerPlayer";
import { useScenePlayer } from "@/lib/use-scene-player";

const LABELS = ["Document", "Laser split", "Overlap", "Indexed"];
const CAPTIONS = [
  "A 500-page handbook cannot fit in the context window.",
  "A splitter cuts the page into bite-size chunks.",
  "Overlap copies the tail of chunk A onto chunk B so meaning survives.",
  "Each overlapping chunk is ready to embed.",
];

export function ChunkingDiagram() {
  const player = useScenePlayer(4, 2300);
  const scene = player.scene;

  return (
    <ExplainerPlayer
      scene={scene}
      count={4}
      playing={player.playing}
      caption={CAPTIONS[scene]}
      labels={LABELS}
      onPlay={player.play}
      onPause={player.pause}
      onReplay={player.replay}
      onSeek={player.setScene}
    >
      <svg viewBox="0 0 640 360" className="absolute inset-0 h-full w-full">
        <rect x="48" y="40" width="130" height="270" rx="8" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
        {[62, 84, 118, 140, 162, 208, 230, 252].map((y, i) => (
          <line
            key={y}
            x1="64"
            y1={y}
            x2={i % 3 === 0 ? 150 : 164}
            y2={y}
            stroke="#94A3B8"
            strokeWidth="5"
            strokeLinecap="round"
          />
        ))}
        <text x="113" y="332" textAnchor="middle" fill="#F8FAFC" fontSize="13">
          Handbook
        </text>

        {scene >= 1 && (
          <motion.rect
            x="40"
            width="146"
            height="6"
            rx="3"
            fill="#F43F5E"
            animate={{ y: [50, 290, 50] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <path d="M 200 175 H 250" className="flow-line" stroke="#38BDF8" strokeWidth="3" fill="none" />
        {scene >= 1 && <FlowDot from={[200, 175]} to={[250, 175]} color="#38BDF8" />}

        <ChunkCard
          x={270}
          y={36}
          color="#38BDF8"
          title="Chunk 1 · 0–200"
          visible={scene >= 1}
          overlap={false}
        />
        <ChunkCard
          x={270}
          y={136}
          color="#10B981"
          title="Chunk 2 · 150–350"
          visible={scene >= 2}
          overlap
        />
        <ChunkCard
          x={270}
          y={236}
          color="#F59E0B"
          title="Chunk 3 · 300–500"
          visible={scene >= 3}
          overlap
        />

        {scene >= 2 && (
          <motion.text
            x="455"
            y="128"
            textAnchor="middle"
            fill="#7DD3FC"
            fontSize="12"
            fontStyle="italic"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            50-token overlap keeps the sentence whole
          </motion.text>
        )}
      </svg>
    </ExplainerPlayer>
  );
}

function ChunkCard({
  x,
  y,
  color,
  title,
  visible,
  overlap,
}: {
  x: number;
  y: number;
  color: string;
  title: string;
  visible: boolean;
  overlap: boolean;
}) {
  return (
    <motion.g
      initial={false}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -16 }}
    >
      <rect x={x} y={y} width="330" height="78" rx="10" fill="#0F172A" stroke={color} strokeWidth="2.5" />
      {overlap && <rect x={x} y={y} width="330" height="22" fill={color} opacity="0.22" />}
      <text x={x + 165} y={y + 24} textAnchor="middle" fill={color} fontSize="14" fontWeight="700">
        {title}
      </text>
      <line x1={x + 18} y1={y + 42} x2={x + 300} y2={y + 42} stroke="#94A3B8" strokeWidth="4" />
      <line x1={x + 18} y1={y + 58} x2={x + 240} y2={y + 58} stroke="#64748B" strokeWidth="4" />
    </motion.g>
  );
}
