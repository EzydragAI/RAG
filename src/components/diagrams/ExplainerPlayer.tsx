"use client";

import { Pause, Play, RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ExplainerPlayerProps = {
  scene: number;
  count: number;
  playing: boolean;
  caption: string;
  labels?: string[];
  children: ReactNode;
  onPlay: () => void;
  onPause: () => void;
  onReplay: () => void;
  onSeek: (scene: number) => void;
};

export function ExplainerPlayer({
  scene,
  count,
  playing,
  caption,
  labels,
  children,
  onPlay,
  onPause,
  onReplay,
  onSeek,
}: ExplainerPlayerProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-700 bg-[#020617] shadow-[0_20px_80px_rgba(56,189,248,0.08)]">
      <div className="relative aspect-[16/11] overflow-hidden bg-[radial-gradient(circle_at_20%_15%,rgba(56,189,248,0.12),transparent_32%),radial-gradient(circle_at_80%_90%,rgba(16,185,129,0.08),transparent_28%)]">
        {children}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20" />
      </div>
      <div className="border-t border-slate-800 bg-slate-900/90 px-3 py-2.5">
        <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-sky-400 transition-all duration-500"
            style={{ width: `${((scene + 1) / count) * 100}%` }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            aria-label={playing ? "Pause animation" : "Play animation"}
            onClick={playing ? onPause : onPlay}
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          </Button>
          <Button size="icon" variant="ghost" aria-label="Replay" onClick={onReplay}>
            <RotateCcw className="size-4" />
          </Button>
          <p className="min-w-0 flex-1 truncate text-sm text-sky-200">{caption}</p>
        </div>
        {labels && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {labels.map((label, index) => (
              <button
                key={label}
                type="button"
                onClick={() => onSeek(index)}
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                  scene === index
                    ? "bg-sky-400 text-slate-950"
                    : "bg-slate-800 text-slate-400 hover:text-white",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function FlowDot({
  from,
  to,
  color,
  delay = 0,
  duration = 1.8,
  r = 5,
}: {
  from: [number, number];
  to: [number, number];
  color: string;
  delay?: number;
  duration?: number;
  r?: number;
}) {
  return (
    <motion.circle
      r={r}
      fill={color}
      animate={{
        cx: [from[0], to[0]],
        cy: [from[1], to[1]],
        opacity: [0, 1, 1, 0],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function GlowPulse({
  cx,
  cy,
  color,
  r = 28,
}: {
  cx: number | string;
  cy: number | string;
  color: string;
  r?: number;
}) {
  return (
    <motion.circle
      cx={Number(cx)}
      cy={Number(cy)}
      fill={color}
      animate={{ r: [r * 0.6, r, r * 0.6], opacity: [0.35, 0.08, 0.35] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
