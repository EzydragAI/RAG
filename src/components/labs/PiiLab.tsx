"use client";

import { useMemo, useState } from "react";
import { maskPii } from "@/lib/pii";

const SAMPLE =
  "Contact John Doe at 555-0192 or jane.doe@acme.com for the secret project. Account 99887766.";

export function PiiLab() {
  const [text, setText] = useState(SAMPLE);
  const masked = useMemo(() => maskPii(text), [text]);

  return (
    <div className="space-y-3">
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        className="h-24 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm text-slate-200 outline-none focus:border-sky-400"
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="example-box">
          <p className="mb-1 text-xs font-semibold text-red-400">Before masking</p>
          <p className="font-mono text-sm text-red-300">{text}</p>
        </div>
        <div className="example-box">
          <p className="mb-1 text-xs font-semibold text-emerald-400">After masking</p>
          <p className="font-mono text-sm text-emerald-300">{masked}</p>
        </div>
      </div>
    </div>
  );
}
