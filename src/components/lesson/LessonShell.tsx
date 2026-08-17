"use client";

import { ChevronLeft, ChevronRight, Maximize } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { ClassTimer } from "@/components/lesson/ClassTimer";
import { LessonContent } from "@/components/lesson/LessonContent";
import { Sidebar } from "@/components/lesson/Sidebar";
import { Button } from "@/components/ui/button";
import { MODULES } from "@/content/modules";

export function LessonShell() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentId = searchParams.get("m") ?? MODULES[0].id;

  const index = useMemo(() => {
    const found = MODULES.findIndex((item) => item.id === currentId);
    return found === -1 ? 0 : found;
  }, [currentId]);

  const lesson = MODULES[index];
  const progress = ((index + 1) / MODULES.length) * 100;

  const go = useCallback(
    (id: string) => {
      router.replace(`/learn?m=${id}`, { scroll: false });
    },
    [router],
  );

  const step = useCallback(
    (delta: number) => {
      const next = MODULES[index + delta];
      if (next) go(next.id);
    },
    [go, index],
  );

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        step(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
      if (event.key.toLowerCase() === "f") {
        event.preventDefault();
        if (document.fullscreenElement) {
          void document.exitFullscreen();
        } else {
          void document.documentElement.requestFullscreen();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar currentId={lesson.id} onSelect={go} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-4 border-b border-slate-800 px-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-slate-500">
              Deep Dive into RAG · {lesson.minutes > 0 ? `${lesson.minutes} min suggested` : "Checkpoint"}
            </p>
            <h1 className="truncate text-xl font-semibold text-sky-400">{lesson.title}</h1>
            <label className="mt-2 block lg:hidden">
              <span className="sr-only">Jump to module</span>
              <select
                value={lesson.id}
                onChange={(event) => go(event.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
              >
                {MODULES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <ClassTimer />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle fullscreen"
            onClick={() => {
              if (document.fullscreenElement) {
                void document.exitFullscreen();
              } else {
                void document.documentElement.requestFullscreen();
              }
            }}
          >
            <Maximize className="size-4" />
          </Button>
        </header>
        <div className="h-1 bg-slate-800">
          <div className="h-full bg-sky-400 transition-all" style={{ width: `${progress}%` }} />
        </div>
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
          <p className="mb-6 max-w-4xl text-slate-400">{lesson.summary}</p>
          <LessonContent lesson={lesson} onNavigate={go} />
        </main>
        <footer className="flex items-center justify-between border-t border-slate-800 px-4 py-3">
          <Button variant="secondary" disabled={index === 0} onClick={() => step(-1)}>
            <ChevronLeft className="size-4" />
            Previous
          </Button>
          <p className="hidden text-xs text-slate-500 sm:block">
            Arrow keys or Space to advance · F for fullscreen
          </p>
          <Button disabled={index === MODULES.length - 1} onClick={() => step(1)}>
            Next
            <ChevronRight className="size-4" />
          </Button>
        </footer>
      </div>
    </div>
  );
}
