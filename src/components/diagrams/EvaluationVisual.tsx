"use client";

import { motion } from "motion/react";
import { ExplainerPlayer } from "@/components/diagrams/ExplainerPlayer";
import { useScenePlayer } from "@/lib/use-scene-player";

const LABELS = ["Ask", "Precision", "Faithful", "Cache"];
const CAPTIONS = [
  "You cannot improve what you cannot measure.",
  "Context precision: did we fetch the right document?",
  "Faithfulness: did the LLM stay inside that document?",
  "Semantic cache serves repeats instantly — skip the LLM.",
];

export function EvaluationVisual() {
  const player = useScenePlayer(4, 2400);
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
        <Pillar
          x={70}
          title="Context precision"
          score={scene >= 1 ? "0.91" : "—"}
          good={scene >= 1}
          detail="Right HR file retrieved"
        />
        <Pillar
          x={360}
          title="Faithfulness"
          score={scene >= 2 ? "0.97" : "—"}
          good={scene >= 2}
          detail={scene >= 2 ? "15 days — no bonus trip invented" : "Waiting…"}
        />
        {scene >= 3 && (
          <motion.g initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <rect x="160" y="268" width="320" height="58" rx="12" fill="#052e1a" stroke="#10B981" strokeWidth="2" />
            <text x="320" y="294" textAnchor="middle" fill="#6EE7B7" fontSize="14" fontWeight="700">
              Cache hit · 12 ms · $0.00
            </text>
            <text x="320" y="314" textAnchor="middle" fill="#94A3B8" fontSize="12">
              “What is the Wi-Fi password?” asked 200× today
            </text>
          </motion.g>
        )}
      </svg>
    </ExplainerPlayer>
  );
}

function Pillar({
  x,
  title,
  score,
  good,
  detail,
}: {
  x: number;
  title: string;
  score: string;
  good: boolean;
  detail: string;
}) {
  return (
    <g>
      <rect x={x} y={40} width="210" height="200" rx="16" fill="#0F172A" stroke={good ? "#10B981" : "#334155"} strokeWidth="2" />
      <text x={x + 105} y={78} textAnchor="middle" fill="#38BDF8" fontSize="15" fontWeight="700">
        {title}
      </text>
      <motion.text
        x={x + 105}
        y={150}
        textAnchor="middle"
        fill={good ? "#6EE7B7" : "#64748B"}
        fontSize="48"
        fontWeight="700"
        animate={good ? { scale: [0.92, 1] } : undefined}
      >
        {score}
      </motion.text>
      <text x={x + 105} y={200} textAnchor="middle" fill="#94A3B8" fontSize="12">
        {detail}
      </text>
    </g>
  );
}
