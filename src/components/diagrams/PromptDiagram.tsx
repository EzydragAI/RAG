"use client";

import { motion } from "motion/react";
import { ExplainerPlayer, FlowDot, GlowPulse } from "@/components/diagrams/ExplainerPlayer";
import { useScenePlayer } from "@/lib/use-scene-player";

const LABELS = ["Query", "Guardrails", "Context", "Stuff", "Answer"];
const CAPTIONS = [
  "The student asks how to reset a password.",
  "System instructions: answer ONLY from retrieved context.",
  "The retriever drops matching handbook chunks into the mixer.",
  "Everything is stuffed into one mega-prompt — not a security attack.",
  "The LLM reads the stuffed prompt and writes a grounded answer.",
];

export function PromptDiagram() {
  const player = useScenePlayer(5, 2100);
  const scene = player.scene;

  return (
    <ExplainerPlayer
      scene={scene}
      count={5}
      playing={player.playing}
      caption={CAPTIONS[scene]}
      labels={LABELS}
      onPlay={player.play}
      onPause={player.pause}
      onReplay={player.replay}
      onSeek={player.setScene}
    >
      <svg viewBox="0 0 640 360" className="absolute inset-0 h-full w-full">
        <Box x={28} y={28} color="#38BDF8" title="User query" body="How to reset password?" />
        {scene >= 1 && (
          <motion.g initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}>
            <Box x={28} y={128} color="#F59E0B" title="Guardrails" body="Use context only" />
          </motion.g>
        )}
        {scene >= 2 && (
          <motion.g initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}>
            <Box x={28} y={228} color="#10B981" title="Retrieved chunks" body="intranet.acme.com/reset" />
          </motion.g>
        )}

        {scene >= 1 && <FlowDot from={[188, 70]} to={[270, 170]} color="#38BDF8" />}
        {scene >= 2 && <FlowDot from={[188, 170]} to={[270, 170]} color="#F59E0B" delay={0.2} />}
        {scene >= 3 && <FlowDot from={[188, 270]} to={[270, 170]} color="#10B981" delay={0.35} />}

        {scene >= 3 && (
          <motion.g initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <GlowPulse cx="330" cy="170" color="#38BDF8" r={40} />
            <rect x="270" y="88" width="120" height="164" rx="16" fill="#0F172A" stroke="#38BDF8" strokeWidth="3" strokeDasharray="7" />
            <text x="330" y="160" textAnchor="middle" fill="#F8FAFC" fontSize="15" fontWeight="700">
              Combined
            </text>
            <text x="330" y="184" textAnchor="middle" fill="#38BDF8" fontSize="15" fontWeight="700">
              Prompt
            </text>
          </motion.g>
        )}

        {scene >= 4 && (
          <motion.g initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
            <path d="M 390 170 H 450" className="flow-line" stroke="#38BDF8" strokeWidth="4" fill="none" />
            <rect x="450" y="128" width="150" height="84" rx="16" fill="#38BDF8" />
            <text x="525" y="176" textAnchor="middle" fill="#020617" fontSize="22" fontWeight="700">
              LLM
            </text>
            <FlowDot from={[525, 212]} to={[525, 270]} color="#10B981" />
            <text x="525" y="300" textAnchor="middle" fill="#6EE7B7" fontSize="16" fontWeight="700">
              Accurate answer
            </text>
          </motion.g>
        )}
      </svg>
    </ExplainerPlayer>
  );
}

function Box({
  x,
  y,
  color,
  title,
  body,
}: {
  x: number;
  y: number;
  color: string;
  title: string;
  body: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width="160" height="72" rx="12" fill="#1E293B" stroke={color} strokeWidth="2" />
      <text x={x + 80} y={y + 30} textAnchor="middle" fill="#F8FAFC" fontSize="14" fontWeight="700">
        {title}
      </text>
      <text x={x + 80} y={y + 50} textAnchor="middle" fill="#94A3B8" fontSize="11">
        {body}
      </text>
    </g>
  );
}
