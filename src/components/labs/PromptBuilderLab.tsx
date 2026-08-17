"use client";

import { useState } from "react";
import { StepControls } from "@/components/ui/step-controls";

const QUERY = "How to reset password?";
const GUARDRAILS =
  "Answer ONLY using the provided context. If the answer is not there, say you do not know.";
const CONTEXT = `Password Reset
If you cannot log in, visit https://intranet.acme.com/reset.
Security will never ask for your password over email.`;

export function PromptBuilderLab() {
  const [step, setStep] = useState(0);

  const prompt = [
    `SYSTEM:\n${GUARDRAILS}`,
    `CONTEXT:\n${CONTEXT}`,
    `USER:\n${QUERY}`,
  ]
    .slice(0, step + 1)
    .join("\n\n");

  return (
    <div className="space-y-3">
      <StepControls
        step={step}
        count={3}
        onStep={setStep}
        labels={["Guardrails", "+ Context", "+ Question"]}
      />
      <pre className="max-h-56 overflow-auto rounded-lg border border-slate-700 bg-slate-950 p-3 text-xs leading-relaxed text-sky-200 whitespace-pre-wrap">
        {prompt}
      </pre>
      {step === 2 && (
        <p className="text-sm text-emerald-400">
          The LLM never “opens” a file. It only sees this stuffed prompt. That is context stuffing — not the security attack called prompt injection.
        </p>
      )}
    </div>
  );
}
