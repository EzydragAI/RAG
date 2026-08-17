"use client";

import { motion } from "motion/react";
import { ExplainerPlayer } from "@/components/diagrams/ExplainerPlayer";
import { useScenePlayer } from "@/lib/use-scene-player";

const LABELS = ["Raw file", "Scan", "Redact", "Shield"];
const CAPTIONS = [
  "Enterprise docs still contain names, phones, and emails.",
  "A scanner walks the page looking for PII patterns.",
  "Hits become tokens: [PERSON], [PHONE_NUM], [EMAIL].",
  "Only the scrubbed page is allowed to be embedded.",
];

export function PiiDiagram() {
  const player = useScenePlayer(4, 2200);
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
        <rect x="210" y="48" width="150" height="210" rx="8" fill="#E2E8F0" />
        <line x1="228" y1="78" x2="330" y2="78" stroke="#94A3B8" strokeWidth="7" strokeLinecap="round" />
        <line x1="228" y1="108" x2="344" y2="108" stroke="#94A3B8" strokeWidth="7" strokeLinecap="round" />
        <motion.line
          x1="228"
          y1="144"
          x2="310"
          y2="144"
          stroke={scene >= 2 ? "#020617" : "#F87171"}
          strokeWidth={scene >= 2 ? 14 : 7}
          strokeLinecap="round"
          animate={scene === 1 ? { opacity: [0.3, 1, 0.3] } : { opacity: 1 }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
        <motion.line
          x1="228"
          y1="178"
          x2="340"
          y2="178"
          stroke={scene >= 2 ? "#020617" : "#F87171"}
          strokeWidth={scene >= 2 ? 14 : 7}
          strokeLinecap="round"
        />
        <text x="285" y="284" textAnchor="middle" fill="#94A3B8" fontSize="13">
          {scene >= 2 ? "John Doe → [PERSON]" : "John Doe · 555-0192"}
        </text>

        {scene >= 1 && scene < 3 && (
          <motion.rect
            x="200"
            width="170"
            height="10"
            rx="4"
            fill="#38BDF8"
            animate={{ y: [60, 240, 60] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {scene >= 3 && (
          <motion.g
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ transformOrigin: "320px 210px" }}
          >
            <path
              d="M320 130 L430 172 L430 244 C430 292 372 314 320 326 C268 314 210 292 210 244 L210 172 Z"
              fill="#10B981"
              opacity="0.92"
              stroke="#059669"
              strokeWidth="4"
            />
            <circle cx="320" cy="230" r="16" fill="#020617" />
            <polygon points="308,270 332,270 326,230 314,230" fill="#020617" />
          </motion.g>
        )}
      </svg>
    </ExplainerPlayer>
  );
}
