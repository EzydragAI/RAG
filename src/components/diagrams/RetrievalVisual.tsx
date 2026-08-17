"use client";

import { motion } from "motion/react";
import { ExplainerPlayer, FlowDot } from "@/components/diagrams/ExplainerPlayer";
import { useScenePlayer } from "@/lib/use-scene-player";

const LABELS = ["Vague", "Rewrite", "Hop 1", "Hop 2"];
const CAPTIONS = [
  "Follow-up: “How do I fix it?” has no search terms.",
  "History-aware rewrite: Error 404 on the login page.",
  "Hop 1: Apple makes the iPhone.",
  "Hop 2: Tim Cook is CEO of Apple.",
];

export function RetrievalVisual() {
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
        <rect x="40" y="40" width="200" height="80" rx="14" fill="#1E293B" stroke="#F87171" strokeWidth="2" />
        <text x="140" y="74" textAnchor="middle" fill="#F8FAFC" fontSize="14" fontWeight="700">
          “How do I fix it?”
        </text>
        <text x="140" y="98" textAnchor="middle" fill="#F87171" fontSize="12">
          too vague to retrieve
        </text>

        {scene >= 1 && (
          <motion.g initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            <path d="M 250 80 H 310" className="flow-line" stroke="#38BDF8" strokeWidth="3" fill="none" />
            <FlowDot from={[250, 80]} to={[310, 80]} color="#38BDF8" />
            <rect x="310" y="40" width="290" height="80" rx="14" fill="#052e1a" stroke="#10B981" strokeWidth="2" />
            <text x="455" y="74" textAnchor="middle" fill="#6EE7B7" fontSize="13" fontWeight="700">
              Rewrite with chat history
            </text>
            <text x="455" y="98" textAnchor="middle" fill="#F8FAFC" fontSize="12">
              Fix Error 404 on the login page
            </text>
          </motion.g>
        )}

        <Hop n={1} x={70} y={180} text="Apple makes the iPhone" on={scene >= 2} />
        {scene >= 2 && <FlowDot from={[250, 230]} to={[330, 230]} color="#F59E0B" />}
        <Hop n={2} x={340} y={180} text="Tim Cook is CEO of Apple" on={scene >= 3} />
      </svg>
    </ExplainerPlayer>
  );
}

function Hop({ n, x, y, text, on }: { n: number; x: number; y: number; text: string; on: boolean }) {
  return (
    <motion.g animate={{ opacity: on ? 1 : 0.15, y: on ? 0 : 8 }}>
      <rect x={x} y={y} width="230" height="100" rx="14" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
      <text x={x + 115} y={y + 38} textAnchor="middle" fill="#F59E0B" fontSize="13" fontWeight="700">
        Hop {n}
      </text>
      <text x={x + 115} y={y + 66} textAnchor="middle" fill="#E2E8F0" fontSize="13">
        {text}
      </text>
    </motion.g>
  );
}
