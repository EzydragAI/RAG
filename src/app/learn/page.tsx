import { Suspense } from "react";
import { LessonShell } from "@/components/lesson/LessonShell";

export default function LearnPage() {
  return (
    <Suspense fallback={<div className="grid h-screen place-items-center text-slate-500">Loading lesson…</div>}>
      <LessonShell />
    </Suspense>
  );
}
