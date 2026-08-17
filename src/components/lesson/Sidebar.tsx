"use client";

import Link from "next/link";
import { MODULES, PHASES, type LessonModule } from "@/content/modules";
import { cn } from "@/lib/utils";

type SidebarProps = {
  currentId: string;
  onSelect: (id: string) => void;
};

export function Sidebar({ currentId, onSelect }: SidebarProps) {
  const currentIndex = MODULES.findIndex((item) => item.id === currentId);

  return (
    <aside className="hidden h-full w-72 shrink-0 flex-col border-r border-slate-800 bg-slate-950/80 lg:flex">
      <div className="border-b border-slate-800 px-4 py-4">
        <Link href="/" className="text-xs font-semibold tracking-widest text-sky-400 uppercase hover:text-sky-300">
          Deep Dive into RAG
        </Link>
        <p className="mt-2 text-xs font-semibold tracking-widest text-slate-500 uppercase">
          60-minute agenda
        </p>
        <p className="mt-1 text-sm text-slate-400">
          Module {Math.max(1, currentIndex + 1)} of {MODULES.length}
        </p>
      </div>
      <nav className="flex-1 space-y-5 overflow-y-auto p-3">
        {PHASES.map((phase) => {
          const items = MODULES.filter((item) => item.phase === phase.id);
          return (
            <div key={phase.id}>
              <div className="mb-2 flex items-baseline justify-between px-2">
                <h2 className="text-xs font-bold tracking-wide text-slate-500 uppercase">
                  {phase.label}
                </h2>
                <span className="text-[10px] text-slate-600">{phase.time}</span>
              </div>
              <ul className="space-y-1">
                {items.map((item) => (
                  <SidebarItem
                    key={item.id}
                    item={item}
                    active={item.id === currentId}
                    onSelect={onSelect}
                  />
                ))}
              </ul>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

function SidebarItem({
  item,
  active,
  onSelect,
}: {
  item: LessonModule;
  active: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(item.id)}
        className={cn(
          "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
          item.kind === "section" && "italic",
          active
            ? "bg-sky-400/15 text-sky-300"
            : "text-slate-400 hover:bg-slate-800 hover:text-white",
        )}
      >
        <span className="block truncate">{item.title}</span>
        {item.minutes > 0 && (
          <span className="text-[11px] text-slate-500">{item.minutes} min</span>
        )}
      </button>
    </li>
  );
}
