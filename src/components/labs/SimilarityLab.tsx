"use client";

import katex from "katex";
import { useMemo, useRef, useState, type PointerEvent } from "react";
import { angleDegrees, cosineSimilarity } from "@/lib/cosine";

type Point = { x: number; y: number };

const ORIGIN = { x: 40, y: 210 };
const SCALE = 160;

function toScreen(point: Point) {
  return { x: ORIGIN.x + point.x * SCALE, y: ORIGIN.y - point.y * SCALE };
}

function fromScreen(x: number, y: number): Point {
  return {
    x: Math.min(1.2, Math.max(-0.2, (x - ORIGIN.x) / SCALE)),
    y: Math.min(1.2, Math.max(-0.2, (ORIGIN.y - y) / SCALE)),
  };
}

export function SimilarityLab() {
  const [query, setQuery] = useState<Point>({ x: 0.85, y: 0.55 });
  const [doc, setDoc] = useState<Point>({ x: 0.95, y: 0.35 });
  const [dragging, setDragging] = useState<"query" | "doc" | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const similarity = useMemo(
    () => cosineSimilarity(query.x, query.y, doc.x, doc.y),
    [doc, query],
  );
  const formula = useMemo(
    () =>
      katex.renderToString(
        String.raw`\cos(\theta)=\frac{A\cdot B}{\|A\|\|B\|}`,
        { throwOnError: false },
      ),
    [],
  );

  function clientToSvg(event: PointerEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const mapped = point.matrixTransform(svg.getScreenCTM()?.inverse());
    return fromScreen(mapped.x, mapped.y);
  }

  function onPointerMove(event: PointerEvent<SVGSVGElement>) {
    if (!dragging) return;
    const next = clientToSvg(event);
    if (dragging === "query") setQuery(next);
    else setDoc(next);
  }

  const q = toScreen(query);
  const d = toScreen(doc);
  const fruit = toScreen({ x: 0.3, y: 0.9 });
  const company = toScreen({ x: 1.05, y: 0.15 });

  return (
    <div className="space-y-3">
      <div dangerouslySetInnerHTML={{ __html: formula }} className="text-center" />
      <svg
        ref={svgRef}
        viewBox="0 0 260 230"
        className="w-full touch-none rounded-xl bg-slate-950"
        onPointerMove={onPointerMove}
        onPointerUp={() => setDragging(null)}
        onPointerLeave={() => setDragging(null)}
      >
        <line x1="40" y1="210" x2="240" y2="210" stroke="#334155" strokeWidth="2" />
        <line x1="40" y1="210" x2="40" y2="20" stroke="#334155" strokeWidth="2" />
        <line x1="40" y1="210" x2={fruit.x} y2={fruit.y} stroke="#64748B" strokeWidth="1" strokeDasharray="3" />
        <text x={fruit.x + 6} y={fruit.y} fill="#94A3B8" fontSize="10">
          apple (fruit)
        </text>
        <line x1="40" y1="210" x2={company.x} y2={company.y} stroke="#64748B" strokeWidth="1" strokeDasharray="3" />
        <text x={company.x - 70} y={company.y + 12} fill="#94A3B8" fontSize="10">
          Apple (company)
        </text>
        <line x1="40" y1="210" x2={q.x} y2={q.y} stroke="#38BDF8" strokeWidth="3" />
        <line x1="40" y1="210" x2={d.x} y2={d.y} stroke="#10B981" strokeWidth="3" />
        <circle
          cx={q.x}
          cy={q.y}
          r="9"
          fill="#38BDF8"
          className="cursor-grab"
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            setDragging("query");
          }}
        />
        <circle
          cx={d.x}
          cy={d.y}
          r="9"
          fill="#10B981"
          className="cursor-grab"
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            setDragging("doc");
          }}
        />
      </svg>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <p className="text-sky-300">
          Cosine: <strong>{similarity.toFixed(3)}</strong>
        </p>
        <p className="text-slate-300">
          Angle: <strong>{angleDegrees(similarity).toFixed(1)}°</strong>
        </p>
      </div>
      <p className="text-xs text-slate-500">
        Drag the blue query vector and the green document vector. Nearby directions mean “same idea,” even if the words differ. Apple-the-fruit and Apple-the-company sit far apart.
      </p>
    </div>
  );
}
