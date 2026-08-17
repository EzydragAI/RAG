"use client";

import { cn } from "@/lib/utils";

type StepControlsProps = {
  step: number;
  count: number;
  onStep: (step: number) => void;
  labels?: string[];
};

export function StepControls({
  step,
  count,
  onStep,
  labels,
}: StepControlsProps) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onStep(index)}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
            step === index
              ? "bg-sky-400 text-slate-950"
              : "bg-slate-800 text-slate-400 hover:text-white",
          )}
        >
          {labels?.[index] ?? `Step ${index + 1}`}
        </button>
      ))}
    </div>
  );
}
