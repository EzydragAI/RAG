"use client";

import { motion } from "motion/react";
import { ExplainerPlayer } from "@/components/diagrams/ExplainerPlayer";
import { useScenePlayer } from "@/lib/use-scene-player";

type IcebergDiagramProps = {
  onSelect?: (
    target:
      | "phase-1"
      | "phase-2"
      | "chunking"
      | "hybrid"
      | "reranking"
      | "graphrag"
      | "evaluation",
  ) => void;
};

const LABELS = ["Surface", "Tip", "Dive", "Depths"];
const CAPTIONS = [
  "A weekend prototype looks finished from the shore.",
  "Above water: PDF loaders and a simple vector DB.",
  "Drop below the waterline — this is where production lives.",
  "Chunking, hybrid search, rerankers, graphs, evaluation.",
];

export function IcebergDiagram({ onSelect }: IcebergDiagramProps) {
  const player = useScenePlayer(4, 2600);

  return (
    <ExplainerPlayer
      scene={player.scene}
      count={4}
      playing={player.playing}
      caption={CAPTIONS[player.scene]}
      labels={LABELS}
      onPlay={player.play}
      onPause={player.pause}
      onReplay={player.replay}
      onSeek={player.setScene}
    >
      <svg viewBox="0 0 800 460" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="ice-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="42%" stopColor="#020617" />
            <stop offset="100%" stopColor="#000" />
          </linearGradient>
        </defs>
        <rect width="800" height="460" fill="url(#ice-sky)" />

        <motion.path
          d="M0 168 Q 140 148 280 168 T 560 168 T 800 168 L 800 176 L 0 176 Z"
          fill="#38BDF8"
          animate={{ opacity: [0.28, 0.5, 0.28], x: [0, 12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {[40, 120, 210, 300, 390].map((x, i) => (
          <motion.circle
            key={x}
            cx={x + 80}
            r="3"
            fill="#7DD3FC"
            animate={{ cy: [420, 180], opacity: [0, 0.7, 0] }}
            transition={{ duration: 3.4, delay: i * 0.45, repeat: Infinity }}
          />
        ))}

        <motion.g
          className="cursor-pointer"
          onClick={() => onSelect?.("phase-1")}
          animate={{ y: player.scene >= 1 ? 0 : 18, opacity: player.scene >= 1 ? 1 : 0.35 }}
        >
          <path d="M360 40 L455 130 L490 168 L270 168 L330 110 Z" fill="#F8FAFC" />
          <path d="M360 40 L390 128 L370 168 L270 168 L330 110 Z" fill="#E2E8F0" />
          <text x="520" y="88" fill="#F8FAFC" fontSize="22" fontWeight="700">
            Basic RAG
          </text>
          <text x="520" y="114" fill="#94A3B8" fontSize="14">
            PDF loaders · simple vector DB
          </text>
        </motion.g>

        <motion.g
          className="cursor-pointer"
          onClick={() => onSelect?.("phase-2")}
          animate={{
            opacity: player.scene >= 2 ? 1 : 0.15,
            y: player.scene >= 2 ? 0 : 24,
          }}
        >
          <path
            d="M270 168 L490 168 L620 280 L560 400 L400 450 L230 390 L150 270 Z"
            fill="#0284C7"
            opacity="0.7"
          />
          <path d="M270 168 L400 168 L400 450 L230 390 L150 270 Z" fill="#0369A1" opacity="0.8" />
          <text x="500" y="230" fill="#38BDF8" fontSize="22" fontWeight="700">
            Advanced RAG
          </text>
          {player.scene >= 3 && (
            <>
              <Topic x={500} y={262} label="Semantic Chunking" onClick={() => onSelect?.("chunking")} />
              <Topic x={500} y={290} label="Hybrid Search" onClick={() => onSelect?.("hybrid")} />
              <Topic x={500} y={318} label="Cross-Encoders" onClick={() => onSelect?.("reranking")} />
              <Topic x={500} y={346} label="GraphRAG" onClick={() => onSelect?.("graphrag")} />
              <Topic x={500} y={374} label="Evaluation" onClick={() => onSelect?.("evaluation")} />
            </>
          )}
        </motion.g>
      </svg>
    </ExplainerPlayer>
  );
}

function Topic({
  x,
  y,
  label,
  onClick,
}: {
  x: number;
  y: number;
  label: string;
  onClick: () => void;
}) {
  return (
    <text
      x={x}
      y={y}
      fill="#E2E8F0"
      fontSize="15"
      className="cursor-pointer"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
    >
      • {label}
    </text>
  );
}
