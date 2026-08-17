"use client";

import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CLASS_MINUTES } from "@/content/modules";
import { cn, formatClock } from "@/lib/utils";

const STORAGE_KEY = "rag-class-timer";

function readTimer() {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return { remaining: CLASS_MINUTES * 60, running: false };
  try {
    return JSON.parse(raw) as { remaining: number; running: boolean };
  } catch {
    return { remaining: CLASS_MINUTES * 60, running: false };
  }
}

export function ClassTimer() {
  const [remaining, setRemaining] = useState(CLASS_MINUTES * 60);
  const [running, setRunning] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = readTimer();
    const id = window.setTimeout(() => {
      setRemaining(saved.remaining);
      setRunning(saved.running);
      setReady(true);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!ready) return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ remaining, running }));
  }, [ready, remaining, running]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setRemaining((value) => value - 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [running]);

  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "min-w-[4.5rem] font-mono text-lg font-bold",
          remaining < 10 * 60 ? "text-amber-400" : "text-sky-300",
          remaining < 0 && "text-red-400",
        )}
      >
        {formatClock(remaining)}
      </span>
      <Button
        size="icon"
        variant="ghost"
        aria-label={running ? "Pause timer" : "Start timer"}
        onClick={() => setRunning((value) => !value)}
      >
        {running ? <Pause className="size-4" /> : <Play className="size-4" />}
      </Button>
      <Button
        size="icon"
        variant="ghost"
        aria-label="Reset timer"
        onClick={() => {
          setRunning(false);
          setRemaining(CLASS_MINUTES * 60);
        }}
      >
        <RotateCcw className="size-4" />
      </Button>
    </div>
  );
}
