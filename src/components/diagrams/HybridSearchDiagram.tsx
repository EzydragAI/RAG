"use client";

import { motion } from "motion/react";
import { ExplainerPlayer, FlowDot } from "@/components/diagrams/ExplainerPlayer";
import { useScenePlayer } from "@/lib/use-scene-player";

const LABELS = ["Query", "Split", "Fuse", "Win"];
const CAPTIONS = [
  "The user searches for a very specific error code.",
  "Keyword search grabs ID-993A. Vectors grab “fix / troubleshoot”.",
  "Reciprocal Rank Fusion blends the two ranked lists.",
  "The runbook that has BOTH the code and the fix rises to #1.",
];

export function HybridSearchDiagram() {
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
        <rect x="200" y="22" width="240" height="46" rx="10" fill="#1E293B" stroke="#F8FAFC" strokeWidth="2" />
        <text x="320" y="50" textAnchor="middle" fill="#F8FAFC" fontSize="15" fontWeight="700">
          “Fix Error ID-993A”
        </text>

        {scene >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <path d="M 250 68 L 150 110" className="flow-line" stroke="#F59E0B" strokeWidth="3" fill="none" />
            <path d="M 390 68 L 490 110" className="flow-line" stroke="#38BDF8" strokeWidth="3" fill="none" />
            <FlowDot from={[250, 68]} to={[150, 110]} color="#F59E0B" />
            <FlowDot from={[390, 68]} to={[490, 110]} color="#38BDF8" delay={0.15} />
            <Lane x={40} color="#F59E0B" title="Sparse · BM25" good="Exact ID-993A" bad="Misses synonyms" />
            <Lane x={400} color="#38BDF8" title="Dense · Vector" good="Finds “troubleshoot”" bad="Misses the ID" />
          </motion.g>
        )}

        {scene >= 2 && (
          <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <path d="M 150 198 L 250 240" className="flow-line" stroke="#F59E0B" strokeWidth="3" fill="none" />
            <path d="M 490 198 L 390 240" className="flow-line" stroke="#38BDF8" strokeWidth="3" fill="none" />
            <rect x="200" y="228" width="240" height="58" rx="10" fill="#1E293B" stroke="#10B981" strokeWidth="3" />
            <text x="320" y="252" textAnchor="middle" fill="#10B981" fontSize="15" fontWeight="700">
              Reciprocal Rank Fusion
            </text>
            <text x="320" y="272" textAnchor="middle" fill="#94A3B8" fontSize="12">
              blend both ranked lists
            </text>
          </motion.g>
        )}

        {scene >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <path d="M 320 286 V 318" stroke="#10B981" strokeWidth="4" />
            <text x="320" y="342" textAnchor="middle" fill="#F8FAFC" fontSize="16" fontWeight="700">
              Login runbook rises to #1
            </text>
          </motion.g>
        )}
      </svg>
    </ExplainerPlayer>
  );
}

function Lane({
  x,
  color,
  title,
  good,
  bad,
}: {
  x: number;
  color: string;
  title: string;
  good: string;
  bad: string;
}) {
  return (
    <g>
      <rect x={x} y={110} width="200" height="88" rx="10" fill="#0F172A" stroke={color} strokeWidth="2" />
      <text x={x + 100} y={136} textAnchor="middle" fill={color} fontSize="14" fontWeight="700">
        {title}
      </text>
      <text x={x + 100} y={160} textAnchor="middle" fill="#CBD5E1" fontSize="12">
        {good}
      </text>
      <text x={x + 100} y={180} textAnchor="middle" fill="#F87171" fontSize="11">
        {bad}
      </text>
    </g>
  );
}
