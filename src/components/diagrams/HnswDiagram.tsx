"use client";

import { motion } from "motion/react";
import { ExplainerPlayer } from "@/components/diagrams/ExplainerPlayer";
import { useScenePlayer } from "@/lib/use-scene-player";

const LABELS = ["Query", "Highway", "Drop", "Street"];
const CAPTIONS = [
  "Comparing a query to 10 million chunks one-by-one is too slow.",
  "HNSW starts on a sparse highway layer and jumps neighborhoods.",
  "The search drops a layer as it nears the right region.",
  "Layer 0 is dense local streets — nearest neighbor in milliseconds.",
];

export function HnswDiagram() {
  const player = useScenePlayer(4, 2300);
  const scene = player.scene;

  const path = [
    { cx: 90, cy: 70 },
    { cx: 170, cy: 82 },
    { cx: 170, cy: 178 },
    { cx: 210, cy: 198 },
    { cx: 210, cy: 278 },
    { cx: 232, cy: 272 },
  ];
  const head = path[Math.min(scene + 1, path.length - 1)];

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
        <Layer points="80,36 560,36 470,108 0,108" color="#38BDF8" label="Layer 2 · highway" />
        <circle cx="170" cy="82" r="6" fill="#38BDF8" />
        <circle cx="330" cy="88" r="6" fill="#38BDF8" />
        <circle cx="230" cy="96" r="6" fill="#38BDF8" />
        <line x1="170" y1="82" x2="330" y2="88" stroke="#38BDF8" strokeWidth="2" />

        <Layer points="80,136 560,136 470,208 0,208" color="#10B981" label="Layer 1" />
        <circle cx="170" cy="178" r="5" fill="#10B981" />
        <circle cx="250" cy="168" r="5" fill="#10B981" />
        <circle cx="210" cy="198" r="5" fill="#10B981" />
        <circle cx="140" cy="188" r="5" fill="#10B981" />

        <Layer points="80,236 560,236 470,308 0,308" color="#8B5CF6" label="Layer 0 · precise" />
        {[
          [210, 278],
          [232, 272],
          [222, 294],
          [198, 288],
          [248, 284],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="#8B5CF6" />
        ))}

        <text x="90" y="54" fill="#F59E0B" fontSize="14" fontWeight="700">
          Query
        </text>
        <motion.circle
          r="9"
          fill="#F59E0B"
          initial={{ cx: 90, cy: 70 }}
          animate={{ cx: head.cx, cy: head.cy }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
        />
        <motion.circle
          r="18"
          fill="#F59E0B"
          opacity="0.25"
          initial={{ cx: 90, cy: 70 }}
          animate={{ cx: head.cx, cy: head.cy }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
        />

        {scene >= 3 && (
          <text x="258" y="268" fill="#F8FAFC" fontSize="13" fontWeight="700">
            Nearest neighbor
          </text>
        )}
      </svg>
    </ExplainerPlayer>
  );
}

function Layer({
  points,
  color,
  label,
}: {
  points: string;
  color: string;
  label: string;
}) {
  return (
    <g>
      <polygon points={points} fill={color} opacity="0.12" stroke={color} />
      <text x="480" y={Number(points.split(",")[1]) + 22} fill={color} fontSize="12">
        {label}
      </text>
    </g>
  );
}
