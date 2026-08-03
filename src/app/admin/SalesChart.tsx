"use client";

import { useState } from "react";

type MonthPoint = { month: string; count: number; bill: number; net: number };

const WIDTH  = 640;
const HEIGHT = 220;
const PAD_X  = 24;
const PAD_TOP = 16;
const PAD_BOTTOM = 32;

export default function SalesChart({ months }: { months: MonthPoint[] }) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (months.length === 0) {
    return <p className="py-8 text-center font-sans text-sm text-text-light">No sales data yet.</p>;
  }

  const maxNet = Math.max(...months.map((m) => m.net), 1);
  const plotW  = WIDTH - PAD_X * 2;
  const plotH  = HEIGHT - PAD_TOP - PAD_BOTTOM;

  const points = months.map((m, i) => {
    const x = PAD_X + (months.length === 1 ? plotW / 2 : (i / (months.length - 1)) * plotW);
    const y = PAD_TOP + plotH - (m.net / maxNet) * plotH;
    return { ...m, x, y };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${PAD_TOP + plotH} L ${points[0].x} ${PAD_TOP + plotH} Z`;

  const hovered = hoverIndex !== null ? points[hoverIndex] : null;

  return (
    <div>
      <div className="relative">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="w-full"
          onMouseLeave={() => setHoverIndex(null)}
        >
          {/* Gridlines */}
          {[0, 0.5, 1].map((f) => (
            <line
              key={f}
              x1={PAD_X} x2={WIDTH - PAD_X}
              y1={PAD_TOP + plotH * f} y2={PAD_TOP + plotH * f}
              stroke="var(--cherry-pink)" strokeOpacity={0.2} strokeWidth={1}
            />
          ))}

          <path d={areaPath} fill="var(--korean-red)" fillOpacity={0.08} />
          <path d={linePath} fill="none" stroke="var(--korean-red)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

          {points.map((p, i) => (
            <g key={p.month}>
              <rect
                x={PAD_X + (i / months.length) * plotW}
                y={PAD_TOP}
                width={plotW / months.length}
                height={plotH}
                fill="transparent"
                onMouseEnter={() => setHoverIndex(i)}
              />
              <circle
                cx={p.x} cy={p.y}
                r={hoverIndex === i ? 5 : 3}
                fill="white" stroke="var(--korean-red)" strokeWidth={2}
              />
              <text x={p.x} y={HEIGHT - 10} textAnchor="middle" className="fill-text-light" fontSize={11}>
                {p.month}
              </text>
            </g>
          ))}
        </svg>

        {hovered && (
          <div
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-lg bg-charcoal px-3 py-2 font-sans text-xs text-white shadow-lg"
            style={{ left: `${(hovered.x / WIDTH) * 100}%`, top: `${(hovered.y / HEIGHT) * 100}%` }}
          >
            <p className="font-bold">{hovered.month}</p>
            <p>RM {hovered.net.toFixed(2)} net · {hovered.count} sale{hovered.count === 1 ? "" : "s"}</p>
          </div>
        )}
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full font-sans text-xs text-text-mid">
          <thead>
            <tr className="text-left text-text-light">
              <th className="py-1 pr-4 font-semibold">Month</th>
              {months.map((m) => <th key={m.month} className="py-1 pr-4 text-right font-semibold">{m.month}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-1 pr-4">Sales</td>
              {months.map((m) => <td key={m.month} className="py-1 pr-4 text-right">{m.count}</td>)}
            </tr>
            <tr>
              <td className="py-1 pr-4">Net (RM)</td>
              {months.map((m) => <td key={m.month} className="py-1 pr-4 text-right">{m.net.toFixed(2)}</td>)}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
