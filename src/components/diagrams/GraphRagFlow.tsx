"use client";

import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEffect, useMemo, useState } from "react";

const WALK = ["project", "team", "lead", "servers", "gpu", "grant"];

function nodeStyle(color: string, active: boolean) {
  return {
    background: active ? color : "#0F172A",
    color: active ? "#020617" : "#F8FAFC",
    border: `2px solid ${color}`,
    borderRadius: 12,
    padding: 10,
    fontWeight: 700,
    boxShadow: active ? `0 0 24px ${color}` : "none",
    transition: "all 300ms ease",
  };
}

const BLURBS: Record<string, string> = {
  project: "Pulse starts at Project X — the hub for global questions.",
  team: "Walk: Project X was developed_by Team A.",
  lead: "Hop again: Team A is led_by Priya Shah.",
  servers: "Project X requires Servers — a capacity question follows this edge.",
  gpu: "Servers run_on the GPU cluster.",
  grant: "Project X was funded_by Grant Y — budget themes become paths.",
};

export function GraphRagFlow() {
  const [selected, setSelected] = useState("project");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setSelected((current) => {
        const index = WALK.indexOf(current);
        return WALK[(index + 1) % WALK.length];
      });
    }, 1800);
    return () => window.clearInterval(id);
  }, [paused]);

  const nodes: Node[] = useMemo(
    () => [
      { id: "project", position: { x: 180, y: 140 }, data: { label: "Project X" }, style: nodeStyle("#38BDF8", selected === "project") },
      { id: "team", position: { x: 20, y: 20 }, data: { label: "Team A" }, style: nodeStyle("#10B981", selected === "team") },
      { id: "servers", position: { x: 340, y: 20 }, data: { label: "Servers" }, style: nodeStyle("#F59E0B", selected === "servers") },
      { id: "grant", position: { x: 180, y: 280 }, data: { label: "Grant Y" }, style: nodeStyle("#8B5CF6", selected === "grant") },
      { id: "lead", position: { x: -40, y: 160 }, data: { label: "Priya Shah" }, style: nodeStyle("#94A3B8", selected === "lead") },
      { id: "gpu", position: { x: 420, y: 160 }, data: { label: "GPU Cluster" }, style: nodeStyle("#94A3B8", selected === "gpu") },
    ],
    [selected],
  );

  const edges: Edge[] = useMemo(
    () => [
      { id: "e1", source: "project", target: "team", label: "developed_by", animated: true },
      { id: "e2", source: "project", target: "servers", label: "requires", animated: true },
      { id: "e3", source: "project", target: "grant", label: "funded_by", animated: true },
      { id: "e4", source: "team", target: "lead", label: "led_by", animated: true },
      { id: "e5", source: "servers", target: "gpu", label: "runs_on", animated: true },
    ],
    [],
  );

  return (
    <div className="space-y-3">
      <div className="h-[340px] overflow-hidden rounded-2xl border border-slate-700 bg-slate-950">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          proOptions={{ hideAttribution: true }}
          onNodeClick={(_, node) => {
            setPaused(true);
            setSelected(node.id);
          }}
        >
          <Background color="#334155" gap={18} />
          <MiniMap pannable zoomable style={{ background: "#020617" }} maskColor="rgba(2,6,23,0.7)" />
          <Controls />
        </ReactFlow>
      </div>
      <p className="rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-sm text-slate-300">
        <span className="font-semibold text-sky-400">Walking the graph: </span>
        {BLURBS[selected]}
        {paused && (
          <button
            type="button"
            className="ml-2 text-xs font-semibold text-sky-400"
            onClick={() => setPaused(false)}
          >
            Resume walk
          </button>
        )}
      </p>
    </div>
  );
}
