"use client";

import { motion } from "motion/react";
import { ExplainerPlayer } from "@/components/diagrams/ExplainerPlayer";
import { useScenePlayer } from "@/lib/use-scene-player";

const LABELS = ["Cast net", "Pour in", "Rescore", "Top 3"];
const CAPTIONS = [
  "The vector DB dumps 100 cheap, noisy neighbors into the funnel.",
  "Good matches (green) are mixed in with near-misses (gray).",
  "A cross-encoder reads query + chunk together and rescores.",
  "Only the top three survive and reach the LLM.",
];

const DOTS = [
  { cx: 150, cy: 78, good: false },
  { cx: 200, cy: 64, good: false },
  { cx: 250, cy: 86, good: true },
  { cx: 305, cy: 68, good: false },
  { cx: 355, cy: 82, good: true },
  { cx: 400, cy: 70, good: false },
  { cx: 130, cy: 108, good: false },
  { cx: 185, cy: 118, good: false },
  { cx: 270, cy: 112, good: true },
  { cx: 340, cy: 116, good: false },
  { cx: 415, cy: 108, good: false },
];

export function RerankFunnel() {
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
        <text x="320" y="28" textAnchor="middle" fill="#F8FAFC" fontSize="15">
          Top 100 chunks — fast bi-encoder
        </text>
        <path
          d="M 90 44 L 550 44 L 360 190 L 360 330 L 280 330 L 280 190 Z"
          fill="#1E293B"
          stroke="#38BDF8"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {DOTS.map((dot, index) => (
          <motion.circle
            key={index}
            r={scene >= 3 && dot.good ? 0 : 7}
            fill={dot.good ? "#10B981" : "#64748B"}
            animate={
              scene === 0
                ? { cx: dot.cx, cy: dot.cy - 40, opacity: 0.2 }
                : scene === 1
                  ? { cx: dot.cx, cy: dot.cy, opacity: 1 }
                  : scene === 2
                    ? {
                        cx: 320 + (dot.good ? (index % 3) * 8 : (index - 5) * 18),
                        cy: dot.good ? 150 : 90,
                        opacity: dot.good ? 1 : 0.2,
                      }
                    : { opacity: 0 }
            }
            transition={{ duration: 0.8, delay: index * 0.04 }}
          />
        ))}

        {scene >= 2 && (
          <motion.text
            x="320"
            y="160"
            textAnchor="middle"
            fill="#38BDF8"
            fontSize="16"
            fontWeight="700"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            Cross-encoder rescoring
          </motion.text>
        )}

        {scene >= 3 &&
          [220, 258, 296].map((y, i) => (
            <motion.circle
              key={y}
              cx="320"
              cy={y}
              r="11"
              fill="#10B981"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.15 }}
            />
          ))}
        {scene >= 3 && (
          <text x="390" y="262" fill="#F8FAFC" fontSize="16">
            Top 3 → LLM
          </text>
        )}
      </svg>
    </ExplainerPlayer>
  );
}
