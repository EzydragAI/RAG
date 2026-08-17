"use client";

import { motion } from "motion/react";
import { ExplainerPlayer, GlowPulse } from "@/components/diagrams/ExplainerPlayer";
import { useScenePlayer } from "@/lib/use-scene-player";

const LABELS = ["Embed", "Query", "Angle", "Match"];
const CAPTIONS = [
  "Each chunk becomes a point in high-dimensional space.",
  "The question is embedded into the same space.",
  "Cosine similarity is the angle between the two arrows.",
  "A small θ means “same idea” — Doc 1 wins, Doc 2 is ignored.",
];

export function VectorDiagram() {
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
        <line x1="70" y1="300" x2="600" y2="300" stroke="#334155" strokeWidth="3" />
        <line x1="70" y1="300" x2="70" y2="36" stroke="#334155" strokeWidth="3" />
        <line x1="70" y1="300" x2="170" y2="200" stroke="#334155" strokeWidth="2" strokeDasharray="5" />

        {scene >= 0 && (
          <>
            <motion.circle cx="210" cy="90" r="7" fill="#64748B" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
            <text x="222" y="86" fill="#94A3B8" fontSize="12">
              apple (fruit)
            </text>
            <motion.circle cx="520" cy="250" r="7" fill="#64748B" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, delay: 0.4, repeat: Infinity }} />
            <text x="400" y="255" fill="#94A3B8" fontSize="12">
              Apple (company)
            </text>
          </>
        )}

        {scene >= 1 && (
          <>
            <GlowPulse cx="70" cy="300" color="#38BDF8" r={24} />
            <motion.line
              x1="70"
              y1="300"
              x2="430"
              y2="90"
              stroke="#38BDF8"
              strokeWidth="5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
            />
            <polygon points="430,90 412,98 424,114" fill="#38BDF8" />
            <text x="444" y="84" fill="#38BDF8" fontSize="16" fontWeight="700">
              Query
            </text>
          </>
        )}

        {scene >= 2 && (
          <>
            <motion.line
              x1="70"
              y1="300"
              x2="500"
              y2="140"
              stroke="#10B981"
              strokeWidth="5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
            />
            <polygon points="500,140 482,136 488,156" fill="#10B981" />
            <text x="512" y="136" fill="#10B981" fontSize="16" fontWeight="700">
              Doc 1
            </text>
            <motion.path
              d="M 170 220 A 140 140 0 0 1 150 170"
              fill="none"
              stroke="#F8FAFC"
              strokeWidth="2"
              strokeDasharray="5"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <text x="186" y="188" fill="#F8FAFC" fontSize="18" fontWeight="700">
              θ small
            </text>
          </>
        )}

        {scene >= 3 && (
          <>
            <motion.line
              x1="70"
              y1="300"
              x2="190"
              y2="70"
              stroke="#F87171"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
            />
            <text x="200" y="64" fill="#F87171" fontSize="15" fontWeight="700">
              Doc 2 — far / irrelevant
            </text>
            <motion.g animate={{ scale: [1, 1.06, 1] }} style={{ transformOrigin: "500px 140px" }}>
              <circle cx="500" cy="140" r="14" fill="#10B981" opacity="0.35" />
            </motion.g>
          </>
        )}
      </svg>
    </ExplainerPlayer>
  );
}
