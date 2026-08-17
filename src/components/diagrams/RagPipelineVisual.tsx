"use client";

import { AnimatePresence, motion } from "motion/react";
import { ExplainerPlayer, FlowDot, GlowPulse } from "@/components/diagrams/ExplainerPlayer";
import { useScenePlayer } from "@/lib/use-scene-player";

const LABELS = ["Question", "Guess", "Retrieve", "Grounded"];
const CAPTIONS = [
  "Student asks: “What is my PTO balance?”",
  "Closed-book LLM has no HR file — it stalls or guesses.",
  "RAG searches the company docs and pulls John’s HR file.",
  "The model answers from the file: 15 days remaining.",
];

export function RagPipelineVisual() {
  const player = useScenePlayer(4, 2400);

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
      <svg viewBox="0 0 640 360" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="rag-llm" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#818CF8" />
          </linearGradient>
        </defs>

        <motion.g animate={{ x: player.scene >= 2 ? -8 : 0 }}>
          <rect x="30" y="130" width="120" height="90" rx="16" fill="#1E293B" stroke="#F8FAFC" strokeWidth="2" />
          <text x="90" y="172" textAnchor="middle" fill="#F8FAFC" fontSize="15" fontWeight="700">
            Student
          </text>
          <text x="90" y="194" textAnchor="middle" fill="#94A3B8" fontSize="11">
            “My PTO?”
          </text>
        </motion.g>

        <path d="M 160 175 H 230" className="flow-line" stroke="#64748B" strokeWidth="3" fill="none" />
        {player.scene >= 0 && <FlowDot from={[160, 175]} to={[230, 175]} color="#38BDF8" />}

        <GlowPulse cx="300" cy="175" color="#38BDF8" r={player.scene >= 3 ? 46 : 30} />
        <rect
          x="230"
          y="115"
          width="140"
          height="120"
          rx="20"
          fill="#0F172A"
          stroke="url(#rag-llm)"
          strokeWidth="3"
        />
        <text x="300" y="168" textAnchor="middle" fill="#38BDF8" fontSize="22" fontWeight="700">
          LLM
        </text>
        <text x="300" y="192" textAnchor="middle" fill="#94A3B8" fontSize="12">
          {player.scene < 2 ? "closed book" : "open book"}
        </text>

        <AnimatePresence>
          {player.scene === 1 && (
            <motion.g
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <rect x="400" y="140" width="210" height="70" rx="12" fill="#1E293B" stroke="#F87171" strokeWidth="2" />
              <text x="505" y="172" textAnchor="middle" fill="#F87171" fontSize="14" fontWeight="700">
                I don’t have your HR data
              </text>
              <text x="505" y="194" textAnchor="middle" fill="#94A3B8" fontSize="11">
                hallucination / refusal
              </text>
            </motion.g>
          )}
        </AnimatePresence>

        {player.scene >= 2 && (
          <motion.g initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}>
            <rect x="430" y="36" width="180" height="88" rx="12" fill="#0F172A" stroke="#10B981" strokeWidth="2" />
            <text x="520" y="64" textAnchor="middle" fill="#10B981" fontSize="13" fontWeight="700">
              Vector store
            </text>
            <text x="520" y="86" textAnchor="middle" fill="#E2E8F0" fontSize="12">
              User_John_HR.pdf
            </text>
            <text x="520" y="106" textAnchor="middle" fill="#94A3B8" fontSize="11">
              PTO remaining: 15 days
            </text>
            <path d="M 430 80 H 370 V 140" className="flow-line" stroke="#10B981" strokeWidth="2.5" fill="none" />
            <FlowDot from={[430, 80]} to={[370, 80]} color="#10B981" delay={0.1} />
            <FlowDot from={[370, 80]} to={[370, 140]} color="#10B981" delay={0.5} />
          </motion.g>
        )}

        {player.scene >= 3 && (
          <motion.g initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <path d="M 370 175 H 430" className="flow-line" stroke="#10B981" strokeWidth="3" fill="none" />
            <rect x="430" y="214" width="180" height="88" rx="12" fill="#052e1a" stroke="#10B981" strokeWidth="2" />
            <text x="520" y="248" textAnchor="middle" fill="#6EE7B7" fontSize="13" fontWeight="700">
              Grounded answer
            </text>
            <text x="520" y="274" textAnchor="middle" fill="#F8FAFC" fontSize="14">
              John, you have 15 days.
            </text>
            <FlowDot from={[370, 175]} to={[430, 250]} color="#10B981" />
          </motion.g>
        )}
      </svg>
    </ExplainerPlayer>
  );
}
